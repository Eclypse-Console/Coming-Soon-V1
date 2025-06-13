import { router } from "../trpc/index";
import { newsletterRouter } from "./newsletterRouter";
import { testServerRouter } from "./testServer";

export const appRouter = router({
  newsletter: newsletterRouter,
  testServer: testServerRouter
});

export type AppRouter = typeof appRouter;
