import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

createConnection();

const server = express();

server.use(express.json);

server.listen(3080, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3080');
});
