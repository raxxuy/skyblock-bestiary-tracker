import { eq } from "drizzle-orm";
import { db } from "./db";
import { type User, userTable } from "./schema";

export const createUser = async (user: User) => {
  const [createdUser] = await db.insert(userTable).values(user).returning();
  return createdUser;
};

export const updateUser = async (mojangId: string, data: Partial<User>) => {
  const [updatedUser] = await db
    .update(userTable)
    .set(data)
    .where(eq(userTable.mojangId, mojangId))
    .returning()
    .limit(1);
  return updatedUser;
};
