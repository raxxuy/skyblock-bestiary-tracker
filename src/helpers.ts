/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile, Member } from "@/types/profileData";
import { MobAlias, MobAliases, FamilyData } from "@/types/mobData";
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
export function getMobName(mobKey: string): MobAlias | undefined {
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
 * Processes bestiary data from profiles and returns a summary of mob kills organized by family
 * @param profile The profile containing bestiary data
 * @param uuid The UUID of the player
 * @returns An object mapping family names to their mob data
 */
export function processBestiaryData(profile: Profile, uuid: string): Record<string, FamilyData> {
  // Get the profile's kills data
  const kills = profile.members[uuid]?.bestiary?.kills;

  if (!kills) {
    return {};
  }

  const familyData: Record<string, FamilyData> = {};
  const unknownFamily = "Unknown";

  Object.entries(kills).forEach(([mobKey, killCount]) => {
    const mobAlias = getMobName(mobKey);
    const mobName = mobAlias?.name || mobKey;
    const family = mobAlias?.family || unknownFamily;
    
    // Initialize family if it doesn't exist
    if (!familyData[family]) {
      familyData[family] = {
        name: family,
        category: true,
        mobs: {}
      };
    }
    
    // Add or update mob in the family
    familyData[family].mobs[mobName] = {
      name: mobName,
      bracket: 0, // Default values since we don't have this data
      tier: 0,    // Default values since we don't have this data
      kills: (familyData[family].mobs[mobName]?.kills || 0) + killCount
    };
  });

  return familyData;
}

/**
 * Flattens family data into a simple mob name to kill count mapping
 * @param familyData The family data object
 * @returns A record mapping mob names to kill counts
 */
export function flattenFamilyData(familyData: Record<string, FamilyData>): Record<string, number> {
  const mobNameToSum: Record<string, number> = {};
  
  Object.values(familyData).forEach(family => {
    Object.values(family.mobs).forEach(mob => {
      mobNameToSum[mob.name] = mob.kills;
    });
  });
  
  return mobNameToSum;
}