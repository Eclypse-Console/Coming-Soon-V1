import { createHTTPServer } from "@trpc/server/adapters/standalone";
import dotenv from "dotenv";
import { appRouter } from "./trpc/router";

dotenv.config();

const port = Number(process.env.PORT || 2025);

createHTTPServer({ router: appRouter }).listen(port);

console.log(`🚀 Server running at http://localhost:${port}`);
