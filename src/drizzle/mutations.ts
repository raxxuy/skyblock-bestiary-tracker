import { eq } from "drizzle-orm";
import { db } from "./db";
import { User, userTable } from "./schema";

export const createUser = async (user: User) => {
  await db.insert(userTable).values(user);
};

export const updateUser = async (mojangId: string, user: User) => {
  await db.update(userTable).set(user).where(eq(userTable.mojangId, mojangId));
};
