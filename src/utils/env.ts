import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  GCP_PROJECT_ID: z.string(),
  GCP_BUCKET_NAME: z.string(),
  GCP_SERVICE_ACCOUNT_JSON: z.string().transform(json => JSON.parse(json) as Record<string, string>),

  BACKUP_NAME: z.string(),

  POSTGRES_URL: z.string().url(),

  CRON: z.string().default("0 */12 * * *"),

  RUN_ON_STARTUP: z.coerce.boolean().default(false)
});

export const env = envSchema.parse(process.env);