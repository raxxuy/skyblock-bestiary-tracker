import bestiaryData from "@/data/bestiary.json";
import entriesData from "@/data/entries.json";
import tiersData from "@/data/tiers.json";
import type { BestiaryEntry, FamilyMap } from "@/types/data";
import type { Bestiary } from "@/types/skyblock";

const getCurrentTier = (entry: BestiaryEntry, kills: number): number => {
  const { bracket, tier } = entry;
  return Math.min(
    tiersData.findIndex((t) => kills < t[bracket]),
    tier,
  );
};

// Maps the data from the API to a more usable format
export const getBestiaryStats = (bestiary: Bestiary) => {
  const regexMap = Object.fromEntries(
    Object.entries(entriesData).map(([pattern, entry]) => [
      pattern,
      { entry, kills: 0 },
    ]),
  );

  for (const [name, _kills] of Object.entries(bestiary.kills)) {
    for (const [pattern, entry] of Object.entries(regexMap)) {
      if (name.match(pattern)) {
        regexMap[pattern] = { ...entry, kills: entry.kills + _kills };
        break;
      }
    }
  }

  return Object.entries(regexMap).reduce<FamilyMap>(
    (familyMap, [pattern, { entry, kills }]) => {
      const bestiaryEntry = (
        bestiaryData[
          entry.family as keyof typeof bestiaryData
        ] as BestiaryEntry[]
      ).find((b_entry) => b_entry.title === entry.name);

      if (!bestiaryEntry) return familyMap;

      const currentTier = getCurrentTier(bestiaryEntry, kills);

      const resultEntry = {
        ...bestiaryEntry,
        kills,
        pattern,
        currentTier,
        family: entry.family,
      };

      if (!familyMap[entry.family]) {
        familyMap[entry.family] = [];
      }

      familyMap[entry.family].push(resultEntry);

      return familyMap;
    },
    {},
  );
};
