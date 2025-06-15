import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { appRouter } from "@routers/index";
import { createExpressMiddleware } from "@trpc/server/adapters/express";



dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 10000);

// Basic middleware
app.use(express.json());
app.use(cors());

// Simple route handlers
app.get('/', (_, res) => {
  res.json({
    status: "ok",
    message: "Eclypse API is running",
    version: "1.0.0",
    endpoints: {
      trpc: "/trpc",
      health: "/health"
    }
  });
});

app.get('/health', (_, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// tRPC setup
const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext: () => ({}),
});

app.use('/trpc', trpcMiddleware);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}/`);
});

export * from "./routers/index";
