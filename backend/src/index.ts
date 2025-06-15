import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { appRouter } from "@routers/index";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { config } from "@packages/common/config.ts";

dotenv.config();

const app = express();
const PORT = Number(config.PORT || process.env.PORT || 6970);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(
    `🚀 Express + tRPC server running on http://localhost:${PORT}/trpc`
  );
});

export * from "./routers/index";
