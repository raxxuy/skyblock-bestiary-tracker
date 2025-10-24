"use client";

import Image from "next/image";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import type { User } from "@/drizzle/schema";
import type { Profile } from "@/types/skyblock";
import ProfilesSection from "./_components/ProfilesSection";

export default function Home() {
  const [searchState, setSearchState] = useState<{
    user: User | null;
    profiles: Profile[] | null;
    loading: boolean;
  }>({
    user: null,
    profiles: null,
    loading: false,
  });

  const onSearch = async (query: string) => {
    setSearchState((prev) => ({ ...prev, loading: true }));
    const response = await fetch(`/api/users/${query}`);
    const { user, profiles } = await response.json();
    setSearchState({
      user,
      profiles,
      loading: false,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
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

      <main className="grid w-full flex-1 bg-zinc-900">
        {searchState.loading ? (
          <div className="self-center justify-self-center">Loading...</div>
        ) : searchState.user && searchState.profiles ? (
          <div className="p-8">
            <ProfilesSection
              user={searchState.user}
              profiles={searchState.profiles}
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
