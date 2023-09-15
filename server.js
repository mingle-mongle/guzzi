import { app } from './app.js';
import { db } from './db/database.js';
import { redisClient } from './db/redis.js';

const port = 8080;

await db.getConnection().then((connection) => console.log('DB is connected!'));

await redisClient.connect();

app.listen(port, () => {
  console.log(`app listening on portTest ${port}`);
});
