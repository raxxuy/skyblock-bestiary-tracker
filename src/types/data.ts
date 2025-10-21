export type Bestiary = Record<string, BestiaryEntry[]>;

export type BestiaryEntry = {
  title: string;
  bracket: number;
  tier: number;
  kills_to_max: number;
  description: string;
};

export type RegexEntries = Record<string, RegexEntry>;

export type RegexEntry = {
  family: string;
  name: string;
};
