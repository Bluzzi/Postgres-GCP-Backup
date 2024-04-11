import { Storage } from "@google-cloud/storage";
import { env } from "#/utils/env";

export const storage = new Storage({ credentials: env.GCP_CREDENTIALS });
export const bucket = storage.bucket(env.GCP_BUCKET_NAME);