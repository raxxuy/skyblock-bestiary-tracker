import bestiary from "@/data/bestiary.json";
import entries from "@/data/entries.json";
import tiers from "@/data/tiers.json";
import type { BestiaryEntry, RegexEntry } from "@/types/data";

const getEntry = (name: string): RegexEntry | null => {
  for (const [pattern, entry] of Object.entries(entries)) {
    if (name.match(pattern)) {
      return entry;
    }
  }

  return null;
};

export const getCurrentTier = (name: string, kills: number): number => {
  const entry = getEntry(name);
  if (!entry) return 0;

  const bestiaryEntry = (
    bestiary[entry.family as keyof typeof bestiary] as BestiaryEntry[]
  ).find((b_entry) => b_entry.title === entry.name);

  if (!bestiaryEntry) return 0;

  const { bracket, tier } = bestiaryEntry;

  const index = tiers.findIndex((t) => kills < t[bracket]);
  return index >= 0 ? index : tier;
};
