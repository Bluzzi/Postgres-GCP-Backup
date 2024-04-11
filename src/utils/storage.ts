import { Storage } from "@google-cloud/storage";
import { env } from "#/utils/env";

export const storage = new Storage({ projectId: env.GCP_PROJECT_ID, credentials: env.GCP_SERVICE_ACCOUNT_JSON });
export const bucket = storage.bucket(env.BACKUP_NAME);