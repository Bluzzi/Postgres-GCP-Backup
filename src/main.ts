import { logger } from "#/utils/logger";
import { env } from "#/utils/env";
import { Cron } from "croner";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { unlinkSync } from "fs";
import { bucket } from "#/utils/storage";
import { cwd } from "process";

const cron = Cron(env.CRON, async() => {
  const location = `${cwd()}/temp/${randomUUID()}.tar.gz`;

  logger.info(`create local backup (${location})...`);
  execSync(`pg_dump ${env.POSTGRES_URL} -F t | gzip > ${location}`);

  logger.info(`upload into the bucket as "${env.BACKUP_NAME}" name...`);
  await bucket.upload(env.BACKUP_NAME);

  logger.info(`delete local backup (${location})...`);
  unlinkSync(location);

  logger.success("backup created!");
});

if (env.RUN_ON_STARTUP) void cron.trigger();

logger.success(`cron ${env.CRON} started`);