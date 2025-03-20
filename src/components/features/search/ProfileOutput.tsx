import { Profile } from "@/types/profileData";
import { ProfileHeader, KillSummary, BestiarySummary } from "@/components/features/search/profile";
import useBestiaryData from "@/hooks/useBestiaryData";

interface ProfileProps {
  profile: Profile;
  uuid: string;
}

export default function ProfileOutput({ profile, uuid }: ProfileProps) {
  // Use the extracted hook for all data processing logic
  const {
    familyData,
    selectedFamily,
    setSelectedFamily,
    mobNameToSum,
    selectedImage,
    setSelectedImage,
    toggleImageSelection,
    selectedFamilyMobs
  } = useBestiaryData(profile, uuid);

  if (!profile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-600 dark:text-zinc-400">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <ProfileHeader profile={profile} />
      <KillSummary profile={profile} uuid={uuid} />
      <BestiarySummary 
        familyData={familyData}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        toggleImageSelection={toggleImageSelection}
        selectedFamilyMobs={selectedFamilyMobs}
        mobNameToSum={mobNameToSum}
      />
    </div>
  );
}