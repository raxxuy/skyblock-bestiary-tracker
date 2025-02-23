type Profile = {
  profile_id: string;
  cute_name: string;
  selected: boolean;
  members: Record<string, Member>;
}

type Member = {
  player_id: string;
  bestiary: {
    milestone: { last_claimed_milestone: number };
    kills: Record<string, number>;
  };
}
