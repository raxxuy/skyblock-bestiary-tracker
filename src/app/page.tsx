"use client";

import { SearchInput, SearchOutput } from "@/components/features/search";
import { Profile } from "@/types/profileData";
import { useState, useCallback, useEffect } from "react";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const fetchData = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setContent(null);
      setError(null);
      return;
    }

    setLoading(true);
    setContent(null);
    setError(null);

    fetch(`api/search?username=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          throw new Error(data.cause || "Failed to fetch data");
        }
        setContent(data.profiles);
      })
      .catch(err => setError(err instanceof Error ? err.message : "An unexpected error occurred"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData(query);
  }, [query, fetchData]);

  if (!theme) {
    return null;
  }

  return (
    <div className="w-full h-screen flex justify-center p-8">
      <div className="w-full h-full flex justify-center gap-2">
        <div className="w-1/2">
          <SearchInput onSearch={handleSearch} isLoading={loading} />
        </div>
        <div className="w-full">
          <SearchOutput content={content} error={error} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}