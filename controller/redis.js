import { redisClient } from '../db/redis.js';

export const createListToRedis = async (list) => {
  try {
    await redisClient
      .multi()
      .LPUSH(`v1@guzzi`, JSON.stringify(list))
      .LTRIM(`v1@guzzi`, 0, 99)
      .exec();
  } catch (error) {}
};

// export const getAllListFromRedis = async () => {

// }
