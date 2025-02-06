import { Profile, Member } from "@/types";
import { insertUser } from "@/drizzle/mutations";
import { getUserByUsername } from "@/drizzle/queries";
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
  const profiles = transformProfiles(data.profiles);

  return NextResponse.json(profiles);
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

function transformProfiles(apiProfiles: any[]): Profile[] {
  return apiProfiles.map(profile => {
    return {
      profile_id: profile.profile_id,
      cute_name: profile.cute_name,
      selected: profile.selected,
      members: transformMembers(profile.members)
    } satisfies Profile;
  });
}

function transformMembers(apiMembers: Map<string, any>): Member[] {
  return Object.entries(apiMembers).map(([player_id, member]) => {
    return {
      player_id,
      bestiary: {
        kills: member?.bestiary?.kills || new Map(),
        milestone: member?.bestiary?.milestone?.last_claimed_milestone || 0
      },
      player_stats: {
        kills: member?.player_stats?.kills || new Map()
      }
    } satisfies Member;
  }); 
}