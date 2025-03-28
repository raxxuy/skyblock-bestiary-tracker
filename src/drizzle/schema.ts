import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").unique().notNull(),
  uuid: text("uuid").unique().notNull(),
});

export type User = typeof users.$inferSelect;