import { processBestiaryData } from "@/helpers";
import { Profile } from "@/types/profileData";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface SearchOutputProps {
  content: Profile[] | null;
  error: string | null;
  isLoading: boolean;
  theme?: string | null;
}

export default function SearchOutput({ content, error, isLoading }: SearchOutputProps) {
  const [mobNameToSum, setMobNameToSum] = useState<Record<string, number>>({});

  useEffect(() => {
    setMobNameToSum(processBestiaryData(content));
  }, [content]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-zinc-600 dark:text-zinc-400">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Enter a username to search for profiles</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <h2 className="text-lg font-medium mb-2">Profile Data</h2>
        <pre className="overflow-auto max-h-[400px] p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
      
      <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
        <h2 className="text-lg font-medium mb-2">Bestiary Summary</h2>
        <pre className="overflow-auto max-h-[400px] p-2 bg-zinc-50 dark:bg-zinc-900 rounded">
          {JSON.stringify(mobNameToSum, null, 2)}
        </pre>
      </div>
    </div>
  );
}