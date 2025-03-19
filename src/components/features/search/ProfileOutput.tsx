import { Profile } from "@/types/profileData";
import { processBestiaryData } from "@/helpers";
import { useEffect, useState } from "react";

interface ProfileProps {
  profile: Profile;
  uuid: string;
}

export default function ProfileOutput({ profile, uuid }: ProfileProps) {
  const [mobNameToSum, setMobNameToSum] = useState<Record<string, number>>({});

  useEffect(() => {
    setMobNameToSum(processBestiaryData([profile]));
  }, [profile]);

  if (!profile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-600 dark:text-zinc-400">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <h2 className="text-lg font-medium mb-2">Profile: {profile.cute_name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Profile ID</p>
            <p className="font-mono text-sm">{profile.profile_id}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Selected</p>
            <p>{profile.selected ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

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
              {Object.entries(profile.members[uuid].bestiary.kills).map(([mobName, killCount]) => (
                <tr key={mobName} className="border-b border-zinc-200 dark:border-zinc-700">
                  <td className="p-2">{mobName}</td>
                  <td className="text-right p-2">{killCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <h2 className="text-lg font-medium mb-2">Bestiary Summary</h2>
        <div className="overflow-auto max-h-[400px] p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
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
        </div>
      </div>
    </div>
  );
}