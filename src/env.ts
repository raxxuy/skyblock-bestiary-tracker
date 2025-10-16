import { z } from "zod";

const envSchema = z.object({
  DB_FILE_NAME: z.string().min(1),
  HYPIXEL_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
