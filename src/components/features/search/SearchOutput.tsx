import { getMobName } from "@/helpers";
import { Profile } from "@/types/profileData";
import { useEffect, useState } from "react";

interface SearchOutputProps {
  content: Profile[] | null;
  error: string | null;
  theme?: string | null;
}

export default function SearchOutput({ content, error }: SearchOutputProps) {
  const [mobNameToSum, setMobNameToSum] = useState<{
    [mobName: string]: number;
  }>({});

  useEffect(() => {
    if (!content || content.length === 0) {
      setMobNameToSum({});
      return;
    }

    const kills = content[0]?.members && Object.values(content[0].members)[0]?.bestiary?.kills;

    if (!kills) {
      setMobNameToSum({});
      return;
    }

    const newMobNameToSum: { 
      [mobName: string]: number 
    } = {};

    Object.entries(kills).forEach(([mobKey, killCount]) => {
      const mobName = getMobName(mobKey) as string;
      newMobNameToSum[mobName] = (newMobNameToSum[mobName] || 0) + killCount;
    });

    setMobNameToSum(newMobNameToSum);
  }, [content]);

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    content ? (
      <div>
        <pre>{JSON.stringify(content, null,2)}</pre>
        <pre>{JSON.stringify(mobNameToSum, null, 2)}</pre>
      </div>
    ) : null
  );
}
