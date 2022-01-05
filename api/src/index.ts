import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
// import { errorMiddleware } from 'utils/ErrorHandler';
import router from './router';

createConnection();

const server = express();

server.use(express.json());

server.use(router);

// server.use(errorMiddleware);

server.listen(3080, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3080');
});
