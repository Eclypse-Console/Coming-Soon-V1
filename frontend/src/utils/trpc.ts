import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../../../backend/src/routers";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  // Use the specific Render deployment URL
  return "https://comming-soon-versionzero.onrender.com";
};

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      headers() {
        return {
          "Content-Type": "application/json",
        };
      },
    }),
  ],
});
