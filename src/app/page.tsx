"use client";

import type { User } from "@/drizzle/schema";
import type { Profile } from "@/types/skyblock";
import Image from "next/image";
import { useState } from "react";
import ProfileSection from "./_components/ProfileSection";
import SearchInput from "./components/SearchInput";

export default function Home() {
  const [searchState, setSearchState] = useState<{
    user: User | null;
    profile: Profile | null;
    loading: boolean;
  }>({
    user: null,
    profile: null,
    loading: false,
  });

  const onSearch = async (query: string) => {
    setSearchState((prev) => ({ ...prev, loading: true }));
    const response = await fetch(`/api/users/${query}`);
    const { user, selectedProfile } = await response.json();
    setSearchState({
      user,
      profile: selectedProfile,
      loading: false,
    });
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="grid w-full bg-zinc-800 px-4 py-4">
        <div className="justify-self-end">
          <a
            href="https://github.com/raxxuy/skyblock-bestiary-tracker"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={"/github-mark-white.svg"}
              width={24}
              height={24}
              alt="github"
            />
          </a>
        </div>
      </header>

      <main className="grid h-screen w-full bg-zinc-900">
        {searchState.loading ? (
          <div className="self-center justify-self-center">Loading...</div>
        ) : searchState.user && searchState.profile ? (
          <div className="p-8">
            <ProfileSection
              user={searchState.user}
              profile={searchState.profile}
            />
          </div>
        ) : (
          <div className="self-center justify-self-center">
            <SearchInput onSearch={onSearch} />
          </div>
        )}
      </main>
    </div>
  );
}
