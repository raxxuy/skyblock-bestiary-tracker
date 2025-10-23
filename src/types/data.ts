export type BestiaryEntry = {
  title: string;
  bracket: number;
  tier: number;
  kills_to_max: number;
  description: string;
};

export type FamilyMap = Record<
  string,
  (BestiaryEntry & {
    kills: number;
    family: string;
    pattern: string;
    currentTier: number;
  })[]
>;
