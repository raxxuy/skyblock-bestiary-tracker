"use client";

import { SearchInput, SearchOutput } from "@/components/core";
import { Profile } from "@/types";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Profile[] | null>(null);

  const handleSearch = (query: string) => {
    fetch(`api/search?username=${query}`)
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="w-full h-screen flex justify-center p-8">
      <div className="w-full h-full flex justify-center gap-2">
        <SearchInput onSearch={handleSearch} />
        <SearchOutput content={content} error={error} />
      </div>
    </div>
  );
}