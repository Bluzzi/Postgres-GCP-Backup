import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  SLACK_APP_TOKEN: z.string(),
  SLACK_BOT_TOKEN: z.string(),

  MONGODB_URL: z.string().url()
});

export const env = envSchema.parse(process.env);