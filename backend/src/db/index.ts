import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as newsletterSchema from "./schema/newsletter";

const schema = {
  ...newsletterSchema,
};

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });






export * from "./schema/newsletter";