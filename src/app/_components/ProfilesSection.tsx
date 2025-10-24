"use client";

import { useState } from "react";
import type { User } from "@/drizzle/schema";
import type { Profile } from "@/types/skyblock";
import BestiaryStats from "./BestiaryStats";

interface ProfilesSectionProps {
  user: User;
  profiles: Profile[];
}

export default function ProfilesSection({
  user,
  profiles,
}: ProfilesSectionProps) {
  const [currentProfile, setCurrentProfile] = useState<Profile>(
    profiles.find((profile) => profile.selected) as Profile,
  );

  const profileNames = profiles.map((profile) => profile.cute_name);

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setCurrentProfile(
      profiles.find(
        (profile) => profile.cute_name === e.target.value,
      ) as Profile,
    );
  };

  return (
    <div className="flex flex-col gap-16 font-mono">
      <section id="info">
        <h1 className="text-3xl">Username: {user.username}</h1>
        <p className="text-xl">
          Profile:{" "}
          <select
            onChange={handleProfileChange}
            className="rounded-lg bg-zinc-800 px-2 py-1"
            defaultValue={currentProfile.cute_name}
          >
            {profileNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </p>
      </section>

      <section id="stats">
        <BestiaryStats
          bestiary={currentProfile.members[user.mojangId].bestiary}
        />
      </section>
    </div>
  );
}
