import { eq } from "drizzle-orm";
import { db } from "./db";
import { userTable } from "./schema";

export const getUser = async (mojangId: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.mojangId, mojangId))
    .limit(1);

  return user;
};
