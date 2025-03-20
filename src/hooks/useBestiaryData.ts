import { Profile, FamilyData } from "@/types";
import { useEffect, useState, useMemo } from "react";
import { processBestiaryData, flattenFamilyData } from "@/helpers";

export default function useBestiaryData(profile: Profile, uuid: string) {
  const [familyData, setFamilyData] = useState<Record<string, FamilyData>>({});
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  useEffect(() => {
    const processedData = processBestiaryData(profile, uuid);
    setFamilyData(processedData);
    const availableFamilies = Object.keys(processedData);
    setSelectedFamily(availableFamilies.length > 0 ? availableFamilies[0] : null);
  }, [profile, uuid]);

  const mobNameToSum = useMemo(() => flattenFamilyData(familyData), [familyData]);

  const toggleImageSelection = (family: string) => 
    setSelectedFamily(prev => prev === family ? null : family);

  const selectedFamilyMobs = useMemo(() => 
    selectedFamily && familyData[selectedFamily]
      ? Object.values(familyData[selectedFamily].mobs).sort((a, b) => b.kills - a.kills)
      : [],
    [selectedFamily, familyData]
  );

  return {
    familyData,
    selectedFamily,
    setSelectedFamily,
    mobNameToSum,
    selectedImage: selectedFamily,
    setSelectedImage: setSelectedFamily,
    toggleImageSelection,
    selectedFamilyMobs
  };
}