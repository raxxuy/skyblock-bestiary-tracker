import { FamilyData, MobData } from "@/types/mobData";
import ImageFilter from "./ImageFilter";
import MobTable from "./MobTable";

interface BestiarySummaryProps {
  familyData: Record<string, FamilyData>;
  selectedFamily: string | null;
  setSelectedFamily: (family: string | null) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  toggleImageSelection: (family: string) => void;
  selectedFamilyMobs: MobData[];
  mobNameToSum: Record<string, number>;
}

export default function BestiarySummary({ 
  familyData, 
  selectedFamily, 
  setSelectedFamily, 
  selectedImage, 
  setSelectedImage,
  toggleImageSelection,
  selectedFamilyMobs,
  mobNameToSum
}: BestiarySummaryProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Bestiary Summary</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="family-select" className="text-sm text-zinc-500 dark:text-zinc-400">
            Filter by Family:
          </label>
          <select
            id="family-select"
            value={selectedFamily || ""}
            onChange={(e) => {
              const value = e.target.value || null;
              setSelectedFamily(value);
              // Update the selected image to match the dropdown selection
              setSelectedImage(value);
            }}
            className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm"
          >
            <option value="">All Families</option>
            {Object.keys(familyData).sort().map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <ImageFilter 
        familyData={familyData}
        selectedImage={selectedImage}
        toggleImageSelection={toggleImageSelection}
      />
      
      <MobTable 
        selectedFamily={selectedFamily}
        selectedFamilyMobs={selectedFamilyMobs}
        mobNameToSum={mobNameToSum}
      />
    </div>
  );
}
