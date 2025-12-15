import { currentUser } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";
import prisma from "@/lib/prisma";

interface Env {
  Bindings: {
    DATABASE_URL: string;
  };
}

export const j = jstack.init<Env>();

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1]; // bearer <API_KEY>
    const user = await prisma.user.findUnique({
      where: {
        apiKey: apiKey,
      },
    });
    if (user) return next({ user });
  }

  const auth = await currentUser();

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user });
});

export const publicProcedure = j.procedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
