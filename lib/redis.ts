import { Redis } from "@upstash/redis"

export const redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_URL as string,
    token: process.env.UPSTASH_REDIS_TOKEN as string
})