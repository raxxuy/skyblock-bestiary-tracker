import { Profile } from "@/types";

interface SearchOutputProps {
  content: Profile[] | null;
  error: string | null;
}

export default function SearchOutput({ content, error }: SearchOutputProps) {
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return content && (
    <div>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}