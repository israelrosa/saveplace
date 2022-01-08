import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { errorMiddleware } from 'utils/ErrorHandler';
import { createConnection } from 'typeorm';
import router from './router';
import { log } from './utils';

createConnection().then(connection => {
  connection.runMigrations({ transaction: 'all' }).then(migrations => {
    migrations.forEach(migration => {
      log.info('Migration %s was runned', migration.name);
    });
  });
});

const server = express();

server.use(express.json({ limit: '2mb' }));

server.use(router);

server.use(errorMiddleware);

server.listen(3080, () => {
  // eslint-disable-next-line no-console
  log.info('Server listening on port 3080 in mode: %s', process.env.NODE_ENV);
});
