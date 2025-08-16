import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { emailRouter } from './routers/email';
import { newsletterRouter } from './routers/newsletter';
import { createContext } from './utils/context';
import { router } from './utils/trpc';
import cron from 'node-cron';

const app = express();

// Get allowed origins from environment variable or use defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['https://eclypse.in', 'http://www.eclypse.in', 'https://jolly-bunny-a4e7fb.netlify.app/', 'http://localhost:5173', 'http://localhost:5174'];

// Enable CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Add request logging
app.use((req: { method: any; url: any; headers: any; body: any; }, res: any, next: () => void) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Root route handler
app.get('/', (req: any, res: any) => {
  res.json({ message: 'ECLYPSE Backend API is running successfully!' });
});

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'healthy' });
});

cron.schedule('*/4 * * * *', async () => {
  try {
    // Use the actual deployed URL for health checks
    const healthUrl = process.env.RENDER_EXTERNAL_URL 
      ? `${process.env.RENDER_EXTERNAL_URL}/health`
      : `http://localhost:${port}/health`;
    
    const res = await fetch(healthUrl);
    if (!res.ok) {
      console.error('Health check failed with status:', res.status);
    } else {
      console.log('Health check successful - keeping service warm');
    }
  } catch (err) {
    console.error('Error during health check cron job:', err);
  }
});

// Create root router
const appRouter = router({
  email: emailRouter,
  newsletter: newsletterRouter,
});

// Create tRPC middleware
app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
  onError: ({ error }: { error: any }) => {
    console.error('tRPC error:', error);
  },
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
}));

const port = process.env.PORT || 3000;

// Start server with error handling
const server = app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
}).on('error', (error: Error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export type AppRouter = typeof appRouter; 