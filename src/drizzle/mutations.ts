"use server";

import { db } from "./index";
import { users } from "./schema";

export async function insertUser(username: string, uuid: string) {
  const [ user ] = await db.insert(users).values({ username, uuid }).returning();
  return user;
}