import { SearchContent, Profile } from "@/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ProfileOutput from "./ProfileOutput";

interface SearchOutputProps {
  content: SearchContent | null;
  error: string | null;
  isLoading: boolean;
  theme?: string | null;
}

export default function SearchOutput({ content, error, isLoading }: SearchOutputProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setSelectedProfile(null);
  }, [content]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-zinc-600 dark:text-zinc-400">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Enter a username to search for profiles</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <h2 className="text-lg font-medium mb-4">Select a Profile</h2>
        <div className="flex flex-wrap gap-2">
          {content.profiles.map((profile) => (
            <button
              key={profile.profile_id}
              onClick={() => setSelectedProfile(profile)}
              className={`
                px-4 py-2 rounded-md border
                ${selectedProfile?.profile_id === profile.profile_id 
                  ? 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700' 
                  : 'bg-white border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700'}
              `}
            >
              <span className="font-medium">{profile.cute_name}</span>
              {profile.selected && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {selectedProfile ? (
        <ProfileOutput profile={selectedProfile} uuid={content.uuid} />
      ) : (
        <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
          <p className="text-zinc-600 dark:text-zinc-400">Select a profile to view details</p>
        </div>
      )}
    </div>
  );
}