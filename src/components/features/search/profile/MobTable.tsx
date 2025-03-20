import { MobData } from "@/types/mobData";

interface MobTableProps {
  selectedFamily: string | null;
  selectedFamilyMobs: MobData[];
  mobNameToSum: Record<string, number>;
}

export default function MobTable({ selectedFamily, selectedFamilyMobs, mobNameToSum }: MobTableProps) {
  return (
    <div className="overflow-auto max-h-[400px] p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
      {selectedFamily ? (
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left p-2">Mob</th>
              <th className="text-right p-2">Kills</th>
            </tr>
          </thead>
          <tbody>
            {selectedFamilyMobs.map((mob) => (
              <tr key={mob.name} className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2">{mob.name}</td>
                <td className="text-right p-2">{mob.kills}</td>
              </tr>
            ))}
            {selectedFamilyMobs.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                  No mobs found in this family
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left p-2">Mob</th>
              <th className="text-right p-2">Kills</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(mobNameToSum).map(([mobName, killCount]) => (
              <tr key={mobName} className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2">{mobName}</td>
                <td className="text-right p-2">{killCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
