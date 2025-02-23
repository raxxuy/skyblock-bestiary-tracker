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

  let existing = await getUserByUsername(username);

  if (!existing) {
    existing = await handleInsertUser(username);
  }

  const data = await getHypixelData(existing.uuid);

  if (!data.success) {
    return NextResponse.json(data.cause, { status: 400 });
  }

  const profiles = data.profiles;
    
  return NextResponse.json(profiles.map(mapToProfile));
}

async function handleInsertUser(username: string) {
  const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
  const data = await response.json();
  return await insertUser(username, data.uuid);
}

async function getHypixelData(uuid: string) {
  const hypixelResponse = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${API_KEY}`);
  const data = await hypixelResponse.json();
  return data;
}