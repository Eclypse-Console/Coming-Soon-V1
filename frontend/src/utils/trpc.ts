import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../../../backend/src/routers";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
        url: `https://csversionzero-git-main-eclypse-product-team.vercel.app`,
       
      }),
  ],
});
