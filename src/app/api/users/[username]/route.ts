import { createUser } from "@/drizzle/mutations";
import { getUser } from "@/drizzle/queries";
import { env } from "@/env";
import type { MojangRequest } from "@/types/request";
import type { SkyblockProfiles } from "@/types/skyblock";

const getMojangProfile = async (username: string) => {
  const response = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${username}`,
  );
  const data: MojangRequest = await response.json();
  return data;
};

const getSkyblockProfiles = async (uuid: string) => {
  const response = await fetch(
    `https://api.hypixel.net/v2/skyblock/profiles?key=${env.HYPIXEL_API_KEY}&uuid=${uuid}`,
  );
  const data: SkyblockProfiles = await response.json();
  return data;
};

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/users/[username]">,
) {
  const { username } = await ctx.params;

  if (!username) {
    return new Response("Username is required", { status: 400 });
  }

  let user = await getUser(username);

  if (!user) {
    const mojangProfile = await getMojangProfile(username);

    if (!mojangProfile) {
      return new Response("User not found", { status: 404 });
    }

    user = await createUser({
      username: mojangProfile.name,
      mojangId: mojangProfile.id,
    });
  }

  const skyblockProfiles = await getSkyblockProfiles(user.mojangId);

  if (!skyblockProfiles.success) {
    return new Response("Failed to fetch Skyblock profiles", { status: 500 });
  }

  // TODO: implement logic for all profiles, not just the selected one
  // TODO: implement logic for situations where the user has done a name change, but their previous name is still in the database

  const selectedProfile = skyblockProfiles.profiles.find(
    (profile) => profile.selected,
  );

  return new Response(JSON.stringify({ user, selectedProfile }), {
    status: 200,
  });
}
