import { app } from './app.js';
import { db } from './db/database.js';

const port = 8080;

await db.getConnection().then((connection) => console.log('mysql connection'));

app.listen(port, () => {
  console.log(`app listening on portTest ${port}`);
});
