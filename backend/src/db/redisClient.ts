import { Redis } from "ioredis";

const SERVER_URI = process.env.REDIS_SERVER || "redis://localhost:6379";
const APP_KEY_PREFIX = "SCA";

const redis = new Redis(SERVER_URI);

export const getClient = () => redis;
export const getKeyName = (key: string, type: string) =>
  `${APP_KEY_PREFIX}:${type}:${key}`;
