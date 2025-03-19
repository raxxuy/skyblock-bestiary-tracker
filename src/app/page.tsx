"use client";

import { SearchInput, SearchOutput } from "@/components/features/search";
import { SearchContent } from "@/types/profileData";
import { useState, useCallback, useEffect } from "react";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<SearchContent | null>(null);
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
        if (!data.success) throw new Error(data.cause || "Failed to fetch data");
        setContent(data);
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
    <div className="w-full min-h-screen flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Skyblock Bestiary Tracker</h1>
      <div className="w-full max-w-md mb-6">
        <SearchInput onSearch={handleSearch} isLoading={loading} />
      </div>
      <div className="w-full flex-grow">
        <SearchOutput content={content} error={error} isLoading={loading} />
      </div>
    </div>
  );
}