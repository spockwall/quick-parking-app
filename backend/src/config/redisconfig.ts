// redisConfig.ts
import Redis from "ioredis";

const redis = new Redis({
  // host: "localhost",
  host: "redis",
  port: 6379,
});

export default redis;
