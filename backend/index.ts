import { appRouter } from "@routers/index";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import dotenv from "dotenv";


dotenv.config();

const port = Number(process.env.PORT || 6970);

createHTTPServer({ router: appRouter }).listen(port);

console.log(`🚀 Server running at http://localhost:${port}`);
