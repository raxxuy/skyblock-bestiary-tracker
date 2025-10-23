import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center rounded-2xl bg-zinc-800 px-3 py-1 text-gray-400 shadow-lg"
    >
      <Search className={`h-4 w-4 ${!query && "text-gray-500"}`} />
      <input
        type="text"
        placeholder="Enter a username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 focus:outline-none"
      />
    </form>
  );
}
