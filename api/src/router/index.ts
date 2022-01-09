import UserController from 'controller/UserController';
import { Router } from 'express';
import queuesRouter from './queue.routes';

const router = Router();
const userController = new UserController();

router.use('/queues', queuesRouter);
router.use('/clients', queueClientsRouter);
router.use('/tags', tagsRouter);

export default router;
