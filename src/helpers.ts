import { Profile, Member } from "@/types/profileData";
import { MobAliases } from "@/types/mobData";
import aliases from "@/data/aliases.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function mapToProfile(rawData: any): Profile {
  const members: Record<string, Member> = {};

  for (const memberId in rawData.members) {
    const rawMember = rawData.members[memberId];

    members[memberId] = {
      player_id: rawMember.player_id,
      bestiary: {
        milestone: {
          last_claimed_milestone: rawMember.bestiary?.milestone?.last_claimed_milestone || 0,
        },
        kills: rawMember.bestiary?.kills || {},
      },
    };
  }

  return {
    profile_id: rawData.profile_id,
    cute_name: rawData.cute_name,
    selected: rawData.selected,
    members,
  };
}

export function getMobName(mobKey: string): string | undefined {
  const _aliases = aliases as MobAliases;

  for (const regexString in _aliases) {
    if (regexString.startsWith("_comment")) continue; // Skip comments

    try {
      // Create a RegExp object from the string in the JSON
      const regex = new RegExp(regexString);

      // Test if the input mobKey matches the regex
      if (regex.test(mobKey)) {
        return _aliases[regexString]; // Return the mob name
      }
    } catch (error) {
      console.error(`Invalid regex: ${regexString}`, error);
      // Handle invalid regex patterns gracefully (e.g., return undefined, log an error)
    }
  }
  return undefined; // No match found
}
