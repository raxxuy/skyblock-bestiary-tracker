import { Profile } from "@/types/profileData";

interface KillSummaryProps {
  profile: Profile;
  uuid: string;
}

export default function KillSummary({ profile, uuid }: KillSummaryProps) {
  if (!profile) return null;
  
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
      <h2 className="text-lg font-medium mb-2">Kill Summary</h2>
      <div className="overflow-auto max-h-[400px] p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left p-2">Mob</th>
              <th className="text-right p-2">Kills</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(profile.members[uuid].bestiary.kills).map(([mobKey, killCount]) => (
              <tr key={mobKey} className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2">{mobKey}</td>
                <td className="text-right p-2">{killCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
