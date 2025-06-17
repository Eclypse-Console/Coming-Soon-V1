import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Configure neon to use WebSocket
neonConfig.webSocketConstructor = WebSocket;

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export type DbClient = typeof db; 