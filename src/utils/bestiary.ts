import entries from "@/data/entries.json";
import { RegexEntry } from "@/types/data";

const getEntry = (name: string): RegexEntry | null => {
  for (const [pattern, entry] of Object.entries(entries)) {
    if (name.match(pattern)) {
      return entry;
    }
  }

  return null;
};
