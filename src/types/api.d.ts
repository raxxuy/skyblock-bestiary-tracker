import { User } from "@/drizzle/schema";
import { Profile } from "./profileData";

export type InsertUserResponse = {
  success: boolean;
  cause?: string;
  user?: User;
}

export type MojangResponse = {
  success: boolean;
  cause?: string;
  uuid?: string;
}

export type HypixelResponse = {
  success: boolean;
  cause?: string;
  uuid?: string;
  profiles?: Profile[];
}

export type SearchContent = {
  profiles: Profile[];
  uuid: string;
};