import { publicProcedure, router } from "../trpc/index";

export const testServerRouter = router({
  hello: publicProcedure.query(() => `This "Hello" is from server which show's its running fine`),
});
