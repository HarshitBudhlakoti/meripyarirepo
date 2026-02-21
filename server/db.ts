import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Check for DATABASE_URL and provide helpful message
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("\n❌ DATABASE_URL environment variable is not set!");
  console.error("\nTo fix this:");
  console.error("1. Get your Supabase connection string from: Project Settings > Database");
  console.error("2. Add it to your .env file: DATABASE_URL=postgresql://...");
  console.error("3. Or set it in Replit Secrets\n");
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });
