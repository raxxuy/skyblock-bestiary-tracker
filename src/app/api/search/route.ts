import { insertUser } from "@/drizzle/mutations";
import { getUserByUsername } from "@/drizzle/queries";
import { mapToProfile } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json("Missing username", { status: 400 });
  }

  let existing = await getUserByUsername(username.toLowerCase());

  if (!existing) {
    const response = await handleInsertUser(username.toLowerCase());

    if (!response.success) {
      return NextResponse.json(response.cause, { status: 400 });
    }

    existing = response.user!;
  }

  const data = await getHypixelData(existing.uuid);

  if (!data.success) {
    return NextResponse.json(data.cause, { status: 400 });
  }

  return NextResponse.json(data.profiles.map(mapToProfile));
}

async function handleInsertUser(username: string) {
  const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
  const data = await response.json();

  if (!data.uuid) {
    return { success: false, cause: "User does not exist" };
  }

  const user = await insertUser(username, data.uuid);

  return { success: true, user };
}

async function getHypixelData(uuid: string) {
  const response = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${API_KEY}`);

  const data = await response.json();

  if (!data.success) {
    return { success: false, cause: "Failed to fetch Skyblock data" };
  }

  return { success: true, profiles: data.profiles };
}