import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  theme?: string | null;
}

export default function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full h-fit flex">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 items-center">
        <input 
          type="text" 
          className="
            w-full h-10 rounded-md border px-2
            border-zinc-300 bg-white
            dark:border-zinc-600 dark:bg-zinc-800
          "
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Minecraft username"
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="
            w-full h-10 rounded-md flex items-center justify-center gap-2
            bg-zinc-100 border-zinc-300 border
            dark:bg-zinc-700 dark:border-zinc-600
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
    </div>
  );
}