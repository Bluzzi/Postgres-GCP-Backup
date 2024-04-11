import { logger } from "#/utils/logger";
import { env } from "#/utils/env";
import { Cron } from "croner";

const cron = Cron("* * * * *", async() => {
  // TODO
});

if (process.argv.includes("dev")) void cron.trigger();

logger.success(`cron ${env.CRON} started`);