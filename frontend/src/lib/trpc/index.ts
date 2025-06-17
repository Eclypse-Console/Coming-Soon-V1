import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from "@backend/src/server";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'https://product-launch-eclypse-1.onrender.com/trpc',
    }),
  ],
});
