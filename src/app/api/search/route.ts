import { Profile } from "@/types/profileData";
import { User } from "@/drizzle/schema";
import { insertUser } from "@/drizzle/mutations";
import { getUserByUsername } from "@/drizzle/queries";
import { mapToProfile } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type InsertUserResponse = {
  success: boolean;
  cause?: string;
  user?: User;
}

type MojangResponse = {
  success: boolean;
  cause?: string;
  uuid?: string;
}

type HypixelResponse = {
  success: boolean;
  cause?: string;
  profiles?: Profile[];
}

/**
 * API route handler for searching Minecraft usernames
 * Returns Hypixel Skyblock profiles for the user
 */
export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username || username.trim() === "") {
    return NextResponse.json({
      success: false,
      cause: "Missing or invalid username"
    }, { status: 400 });
  }

  const normalizedUsername = username.toLowerCase();

  // Try to get user from database first
  let existingUser: User | null = await getUserByUsername(normalizedUsername);

  if (!existingUser) {
    // If user doesn't exist, fetch from Mojang API and insert into database
    const response = await handleInsertUser(normalizedUsername);

    if (!response.success) {
      return NextResponse.json({
        success: false,
        cause: response.cause
      }, { status: 400 });
    }

    existingUser = response.user!;
  }

  // Fetch Hypixel data using the UUID
  const hypixelData = await getHypixelData(existingUser.uuid);

  if (!hypixelData.success) {
    return NextResponse.json({
      success: false,
      cause: hypixelData.cause
    }, { status: 400 });
  }

  // Return success response with mapped profiles
  return NextResponse.json({
    success: true,
    profiles: hypixelData.profiles!.map(mapToProfile)
  });
}

async function handleInsertUser(username: string): Promise<InsertUserResponse> {
  const data = await getMojangData(username);

  if (!data.success) {
    return { success: false, cause: data.cause };
  }

  const user = await insertUser(username, data.uuid!);
  return { success: true, user };
}

/**
 * Fetches Minecraft UUID from Mojang API
 */
async function getMojangData(username: string): Promise<MojangResponse> {
  const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      return { success: false, cause: "Minecraft user does not exist" };
    }
    return { success: false, cause: `Mojang API error: ${response.status}` };
  }

  const data = await response.json();

  if (!data.uuid) {
    return { success: false, cause: "UUID not found in Mojang response" };
  }

  return { success: true, uuid: data.uuid };
}

/**
 * Fetches Skyblock profiles from Hypixel API
 */
async function getHypixelData(uuid: string): Promise<HypixelResponse> {
  if (!API_KEY) {
    return { success: false, cause: "Hypixel API key not configured" };
  }

  const response = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${API_KEY}`);

  if (!response.ok) {
    if (response.status === 403) {
      return { success: false, cause: "Invalid Hypixel API key" };
    }
    return { success: false, cause: `Hypixel API error: ${response.status}` };
  }

  const data = await response.json();

  if (!data.success) {
    return { success: false, cause: data.cause || "Failed to fetch Skyblock data" };
  }

  if (!data.profiles || data.profiles.length === 0) {
    return { success: false, cause: "No Skyblock profiles found for this player" };
  }

  return { success: true, profiles: data.profiles };
}