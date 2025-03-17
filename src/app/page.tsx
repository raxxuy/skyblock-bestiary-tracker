"use client";

import { SearchInput, SearchOutput } from "@/components/features/search";
import { Profile } from "@/types/profileData";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Profile[] | null>(null);

  const handleSearch = (query: string) => {
    setContent(null);
    setError(null);

    fetch(`api/search?username=${query}`)
      .then((res) => res.json())
      .then((data) => setContent(data.profiles))
      .catch((err) => setError(err.message));
  };

  if (!theme) {
    return null;
  }

  return (
    <div className="w-full h-screen flex justify-center p-8">
      <div className="w-full h-full flex justify-center gap-2">
        <div className="w-1/2">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="w-full">
          <SearchOutput content={content} error={error} />
        </div>
      </div>
    </div>
  );
}