import { eq } from "drizzle-orm";
import { db } from "./db";
import { lower, userTable } from "./schema";

export const getUserByMojangId = async (mojangId: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.mojangId, mojangId))
    .limit(1);
  return user;
};

export const getUserByUsername = async (username: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(lower(userTable.username), username.toLowerCase()))
    .limit(1);
  return user;
};
