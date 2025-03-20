import { FamilyData } from "@/types/mobData";
import { familyImageMap } from "@/constants";
import Image from "next/image";

interface ImageFilterProps {
  familyData: Record<string, FamilyData>;
  selectedImage: string | null;
  toggleImageSelection: (family: string) => void;
}

export default function ImageFilter({ familyData, selectedImage, toggleImageSelection }: ImageFilterProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">Filter by Location:</h3>
      <div className="flex flex-wrap gap-2 items-center">
        {Object.entries(familyImageMap).map(([family, imagePath]) => {
          // Only show images for families that exist in the data
          if (!familyData[family]) return null;
          
          return (
            <button
              key={family}
              onClick={() => toggleImageSelection(family)}
              className={`relative overflow-hidden rounded-md transition-all duration-200 ease-in-out ${
                selectedImage === family 
                  ? 'w-16 h-16' 
                  : 'w-12 h-12'
              }`}
              title={family}
            >
              <Image 
                src={imagePath} 
                alt={family} 
                width={selectedImage === family ? 64 : 48} 
                height={selectedImage === family ? 64 : 48} 
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
