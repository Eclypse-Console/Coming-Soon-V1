import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { emailRouter } from './routers/email';
import { newsletterRouter } from './routers/newsletter';
import { createContext } from './utils/context';
import { router } from './utils/trpc';

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://spontaneous-bubblegum-c16839.netlify.app/',
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
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
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

export type AppRouter = typeof appRouter; 