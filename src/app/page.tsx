"use client";

import { User } from "@/drizzle/schema";
import { Profile } from "@/types/skyblock";
import { useState } from "react";
import SearchInput from "./components/SearchInput";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const onSearch = async (query: string) => {
    const response = await fetch(`/api/users/${query}`);
    const { user, selectedProfile } = await response.json();
    setUser(user);
    setProfile(selectedProfile);
  };

  return (
    <div>
      <SearchInput onSearch={onSearch} />
      {profile && (
        <div>
          {user && (
            <div>
              <h2>{user.username}</h2>
              <p>{user.mojangId}</p>
            </div>
          )}
          <h2>{profile.cute_name}</h2>
          <div>
            {Object.entries(profile.members).map(([key, value]) => (
              <div key={key}>
                {JSON.stringify(value)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
