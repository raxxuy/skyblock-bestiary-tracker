import { Profile, Member } from "./types";

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