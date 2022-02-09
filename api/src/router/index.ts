import UsersController from 'controller/UsersController';
import { Router } from 'express';
import queuesRouter from './queue.routes';
import queueClientsRouter from './queueClients.routes';
import tagsRouter from './tags.routes';
import usersRouter from './users.routes';

const router = Router();
const usersController = new UsersController();

router.post('/token/', usersController.authenticate);
router.use('/users', usersRouter);
router.use('/queues', queuesRouter);
router.use('/clients', queueClientsRouter);
router.use('/tags', tagsRouter);

export default router;
