// redisConfig.ts
import Redis from "ioredis";

const redis = new Redis({
  host: "localhost", // 更改为你的 Redis 服务器地址
  port: 6379, // Redis 端口，默认是 6379
});

export default redis;
