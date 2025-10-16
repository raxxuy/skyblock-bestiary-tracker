import { env } from "@/env";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database(env.DB_FILE_NAME);
export const db = drizzle({ client: sqlite });
migrate(db, { migrationsFolder: "./src/drizzle" });
