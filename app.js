import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { db } from './db/database.js';
import listsRouter from './router/lists.js';

const app = express();
const port = '8080';

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/', listsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection().then((connection) => console.log('mysql connection'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
