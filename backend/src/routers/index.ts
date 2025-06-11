import { router } from "../trpc";
import { newsletterRouter } from "./newsletterRouter";
import { testServerRouter } from "./testServer";

export const appRouter = router({
  newsletter: newsletterRouter,
  testServer: testServerRouter
});

export type AppRouter = typeof appRouter;
