import { Profile } from "@/types/profileData";
import { processBestiaryData, flattenFamilyData } from "@/helpers";
import { useEffect, useState } from "react";
import { FamilyData } from "@/types/mobData";

interface ProfileProps {
  profile: Profile;
  uuid: string;
}

export default function ProfileOutput({ profile, uuid }: ProfileProps) {
  const [familyData, setFamilyData] = useState<Record<string, FamilyData>>({});
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [mobNameToSum, setMobNameToSum] = useState<Record<string, number>>({});

  useEffect(() => {
    const processedData = processBestiaryData(profile, uuid);
    setFamilyData(processedData);
    setMobNameToSum(flattenFamilyData(processedData));
    
    // Set default selected family to the first one with data
    const availableFamilies = Object.keys(processedData);
    if (availableFamilies.length > 0) {
      setSelectedFamily(availableFamilies[0]);
    }
  }, [profile, uuid]);

  if (!profile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-600 dark:text-zinc-400">Profile not found</p>
        </div>
      </div>
    );
  }

  // Get the mobs for the selected family
  const selectedFamilyMobs = selectedFamily && familyData[selectedFamily] 
    ? Object.values(familyData[selectedFamily].mobs).sort((a, b) => b.kills - a.kills) 
    : [];

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
      
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Bestiary Summary</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="family-select" className="text-sm text-zinc-500 dark:text-zinc-400">
              Filter by Family:
            </label>
            <select
              id="family-select"
              value={selectedFamily || ""}
              onChange={(e) => setSelectedFamily(e.target.value || null)}
              className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm"
            >
              <option value="">All Families</option>
              {Object.keys(familyData).sort().map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>
        </div>
        
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
      </div>
    </div>
  );
}