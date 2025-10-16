"use client";

import type { User } from "@/drizzle/schema";
import type { Profile } from "@/types/skyblock";
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
    <div className="flex h-screen w-full items-center justify-center">
      {!user ? (
        <div>
          <SearchInput onSearch={onSearch} />
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          {profile ? (
            <div className="h-full w-full">
              <h2>{profile.cute_name}</h2>
              <div>
                <pre>
                  <code>{JSON.stringify(profile.members, null, 2)}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <h2>No Profile Found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
