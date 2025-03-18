/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile, Member } from "@/types/profileData";
import { MobAliases } from "@/types/mobData";
import aliases from "@/data/aliases.json";

/**
 * Maps raw profile data from Hypixel API to a structured Profile object
 * @param rawData The raw profile data from Hypixel API
 * @returns A structured Profile object
 */
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

/**
 * Converts a mob key to a human-readable mob name using regex patterns
 * @param mobKey The raw mob key from the API
 * @returns The human-readable mob name or undefined if no match found
 */
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

/**
 * Processes bestiary data from profiles and returns a summary of mob kills
 * @param profiles The profiles containing bestiary data
 * @returns An object mapping mob names to their kill counts
 */
export function processBestiaryData(profiles: Profile[] | null): Record<string, number> {
  if (!profiles || profiles.length === 0) {
    return {};
  }

  // Get the first profile's kills data
  const kills = profiles[0]?.members && Object.values(profiles[0].members)[0]?.bestiary?.kills;

  if (!kills) {
    return {};
  }

  const mobNameToSum: Record<string, number> = {};

  Object.entries(kills).forEach(([mobKey, killCount]) => {
    const mobName = getMobName(mobKey);
    if (mobName) {
      mobNameToSum[mobName] = (mobNameToSum[mobName] || 0) + killCount;
    } else {
      // For unknown mobs, use the original key
      mobNameToSum[mobKey] = (mobNameToSum[mobKey] || 0) + killCount;
    }
  });

  return mobNameToSum;
}