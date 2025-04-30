import * as dotenv from "dotenv";

dotenv.config();

export default {
  REDIS_URL: process.env.REDIS_URL || "redis://redis:6379",
  AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY || "123",
};
