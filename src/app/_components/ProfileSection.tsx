import type { User } from "@/drizzle/schema";
import type { Profile } from "@/types/skyblock";

interface ProfileSectionProps {
  user: User;
  profile: Profile;
}

export default function ProfileSection({ user, profile }: ProfileSectionProps) {
  return (
    <div className="flex flex-col gap-16 font-mono">
      <section id="info">
        <h1 className="text-3xl">Username: {user.username}</h1>
        <p className="text-xl">Profile: {profile.cute_name}</p>
      </section>
      
      <section id="stats">
      </section>
    </div>
  );
}
