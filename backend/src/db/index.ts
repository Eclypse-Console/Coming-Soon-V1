import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Configure neon to use WebSocket
neonConfig.webSocketConstructor = WebSocket;

// Log database connection attempt
console.log('Attempting to connect to database...');

let db;
try {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql, { schema });
  console.log('Database connection successful');
} catch (error) {
  console.error('Database connection error:', error);
  throw new Error('Failed to connect to database');
}

export { db };
export type DbClient = typeof db; 