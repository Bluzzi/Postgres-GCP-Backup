import { logger } from "#/utils/logger";
import { env } from "#/utils/env";
import { bucket } from "#/utils/storage";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { cwd } from "node:process";
import { Cron } from "croner";

const tempdir = `${cwd()}/temp/`;

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

if (!existsSync(tempdir)) mkdirSync(tempdir);
if (env.RUN_ON_STARTUP) void cron.trigger();

logger.success(`cron ${env.CRON} started`);