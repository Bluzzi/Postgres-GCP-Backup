import { Storage } from "@google-cloud/storage";
import { env } from "#/utils/env";

export const bucket = new Storage({ credentials: env.GCP_CREDENTIALS }).bucket(env.GCP_BUCKET_NAME);

export const uploadFile = async(localFile: string, destination: string): Promise<void> => {
  try {
    await bucket.upload(localFile, { destination });
  } catch (error) {
    console.log(error);
  }
};

export const storage = { uploadFile };