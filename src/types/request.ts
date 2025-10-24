import type { Profile } from "./skyblock";

export type MojangRequest = {
  id: string;
  name: string;
};

export type SkyblockRequest = {
  success: boolean;
  profiles: Profile[];
  cause?: string;
};
