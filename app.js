import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import listsRouter from './router/lists.js';
import swaggerOptions from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const specs = swaggerJSDoc(swaggerOptions);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/', listsRouter);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

export { app };
