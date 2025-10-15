import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  username: text("username").notNull(),
  mojangId: text("mojang_id").primaryKey().notNull(),
  hypixelId: text("hypixel_id").notNull(),
});

export type User = typeof userTable.$inferSelect;
