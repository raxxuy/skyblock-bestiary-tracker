import { eq } from "drizzle-orm";
import { db } from "./db";
import { userTable } from "./schema";

export const getUser = async (username: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1);
  return user;
};
