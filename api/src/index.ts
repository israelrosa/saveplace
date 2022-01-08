import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import 'express-async-errors';
import { errorMiddleware } from 'utils/ErrorHandler';
import router from './router';
import { log } from './utils';

createConnection();

const server = express();

server.use(express.json());

server.use(router);

server.use(errorMiddleware);

server.listen(3080, () => {
  // eslint-disable-next-line no-console
  log.info('Server listening on port 3080 in mode: %s', process.env.NODE_ENV);
});
