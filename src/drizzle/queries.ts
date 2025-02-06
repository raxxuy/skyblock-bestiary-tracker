"use server";

import { eq } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";

export async function getUserByUsername(username: string) {
  const [ user ] = await db.select().from(users).where(eq(users.username, username));
  return user;
}
