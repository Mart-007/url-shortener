import { createClient } from "redis";
import CONFIG from "../config/config";
import * as MESSAGE from "../enums/Messages";
import { logger } from "@app/enums/Logger";

const redisClient = createClient({
  url: CONFIG.REDIS_URL,
});

redisClient.on("error", () => logger.error(MESSAGE.REDIS_CLIENT_ERROR));

let isConnected = false;

export const connectRedis = async () => {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
    console.log("Redis connected");
  }
};

export { redisClient };
