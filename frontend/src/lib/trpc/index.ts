import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from "@backend/src/server";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV 
        ? 'http://localhost:3000/trpc'
        : 'https://product-launch-eclypse.onrender.com/trpc',
    }),
  ],
});
