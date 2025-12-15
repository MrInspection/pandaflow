import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { j, publicProcedure } from "@/server/jstack";

export const dynamic = "force-dynamic";

export const authRouter = j.router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c }) => {
    const auth = await currentUser();

    if (!auth) {
      return c.json({ isSynced: false });
    }

    const user = await prisma.user.findFirst({
      where: { externalId: auth.id },
    });

    console.log("USER IN DB:", user);

    if (!user) {
      await prisma.user.create({
        data: {
          quotaLimit: 100,
          externalId: auth.id,
          email: auth.emailAddresses[0].emailAddress,
        },
      });
    }
    return c.json({ isSynced: true });
  }),
});
