import { MongoClient } from "mongodb";
import { env } from "#/utils/env";
import { logger } from "./logger";

const client = new MongoClient(env.MONGODB_URL);

void (async() => {
  await client.connect();
  logger.success("MongoDB client has connected");
})();

export const mongo = client.db("backend");