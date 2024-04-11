import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  GCP_BUCKET_NAME: z.string(),
  GCP_CREDENTIALS: z.string().transform(json => JSON.parse(json) as Record<string, string>),

  BACKUP_NAME: z.string(),

  POSTGRES_URL: z.string().url(),

  CRON: z.string().default("0 1,13 * * *"),

  RUN_ON_STARTUP: z.coerce.boolean().default(false)
});

export const env = envSchema.parse(process.env);