import { sql } from "drizzle-orm";
import { AnySQLiteColumn, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  username: text("username").unique().notNull(),
  mojangId: text("mojang_id").primaryKey().notNull(),
});

export type User = typeof userTable.$inferSelect;

export const lower = (value: AnySQLiteColumn) => sql`lower(${value})`;
