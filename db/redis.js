import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('err', (err) => console.log('client error', err));
redisClient.on('connect', () => console.log('client is connected'));
redisClient.on('reconnection', () => console.log('client is reconnection'));
redisClient.on('ready', () => console.log('client is ready'));

export { redisClient };
