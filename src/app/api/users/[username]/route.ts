import { createUser } from "@/drizzle/mutations";
import { getUserByUsername } from "@/drizzle/queries";
import { env } from "@/env";
import type { MojangRequest, SkyblockRequest } from "@/types/request";

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
  const data: SkyblockRequest = await response.json();
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

  let user = await getUserByUsername(username);

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

  const { profiles } = await getSkyblockProfiles(user.mojangId);
  
  // TODO: implement logic for bad statuses
  // TODO: implement logic for situations where the user has done a name change, but their previous name is still in the database

  return new Response(JSON.stringify({ user, profiles }), {
    status: 200,
  });
}
