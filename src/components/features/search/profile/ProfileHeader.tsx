import { Profile } from "@/types/profileData";

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  if (!profile) return null;
  
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
      <h2 className="text-lg font-medium mb-2">Profile: {profile.cute_name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Profile ID</p>
          <p className="font-mono text-sm">{profile.profile_id}</p>
        </div>
      </div>
    </div>
  );
}
