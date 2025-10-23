import Card from "@/components/Card";
import type { Bestiary } from "@/types/skyblock";
import { getBestiaryStats } from "@/utils/bestiary";

interface BestiaryStatsProps {
  bestiary: Bestiary;
}

export default function BestiaryStats({ bestiary }: BestiaryStatsProps) {
  const stats = getBestiaryStats(bestiary);
  console.log(bestiary);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(stats).map(([family, entries]) => (
        <Card title={family} key={family}>
          <div className="flex flex-col gap-4">
            {entries.map((entry) => (
              <div key={entry.pattern} className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">{entry.title}</h2>
                <p className="text-gray-500">{entry.description}</p>
                <p className="text-gray-500">
                  {entry.kills}/{entry.kills_to_max} kills
                </p>
                <p className="text-gray-500">
                  Tier: {entry.currentTier}/{entry.tier}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
