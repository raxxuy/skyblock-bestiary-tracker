import { useState, FormEvent } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  theme?: string | null;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full h-fit flex">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <input 
          type="text" 
          className="
            w-full h-10 rounded-md border px-2
            border-zinc-300
            dark:border-zinc-600
          "
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button 
          type="submit"
          className="
            w-full h-10 rounded-md
            bg-zinc-100 border-zinc-300 border
            dark:bg-zinc-700 dark:border-zinc-600
          "
        >
          Search
        </button>
      </form>
    </div>
  );
}