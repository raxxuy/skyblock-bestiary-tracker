export type Bestiary = {
  kills: Record<string, number>;
  milestone: {
    last_claimed_milestone: number;
  };
};

export type Member = {
  player_id: string;
  bestiary: Bestiary;
};

export type Profile = {
  profile_id: string;
  cute_name: string;
  selected: boolean;
  members: Record<string, Member>;
};

export type SkyblockProfiles = {
  success: boolean;
  profiles: Profile[];
};
