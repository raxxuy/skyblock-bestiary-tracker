export type Profile = {
  profile_id: string;
  members: Member[];
  cute_name: string;
  selected: boolean;
}

export type Member = {
  player_id: string;
  bestiary: {
    kills: Map<string, number>;
    milestone: number;
  };
  player_stats: {
    kills: Map<string, number>;
  };
}