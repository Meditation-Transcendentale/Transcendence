import dotenv from "dotenv";
import { AiManager } from "./AiManager.js";

dotenv.config();

const SERVICE_NAME = process.env.SERVICE_NAME ?? "service";
const NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";

const am = new AiManager();

async function main() {
  console.log(`[${SERVICE_NAME}] started`);

  await am.init(NATS_URL);

  console.log(`[${SERVICE_NAME}] NATS subscriptions established`);
}

main().catch((err) => {
  console.error(`[${SERVICE_NAME}] fatal error:`, err);
  process.exit(1);
});

async function shutdown(signal) {
  console.log(`[${SERVICE_NAME}] ${signal} received, draining...`);
  try {
    await am.stop?.();
  } catch {}
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
