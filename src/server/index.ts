import { j } from "@/server/jstack";
import { authRouter } from "@/server/routers/auth.router";
import { categoryRouter } from "@/server/routers/category.router";
import { paymentRouter } from "@/server/routers/payment.router";
import { projectRouter } from "@/server/routers/project.router";

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const appRouter = j.mergeRouters(api, {
  auth: authRouter,
  category: categoryRouter,
  payment: paymentRouter,
  project: projectRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
