import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { appRouter } from "@routers/index";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { config } from "@packages/common/config.ts";

dotenv.config();

const app = express();
const PORT = Number(config.PORT || process.env.PORT || 10000);

// Enable CORS with more permissive settings
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Handle preflight requests
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

// Root route handler
app.get("/", (req, res) => {
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

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// tRPC middleware with CORS headers
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.error('tRPC Error:', error);
    },
  })
);

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not Found",
    path: req.path
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}/`);
});

export * from "./routers/index";
