import UserController from 'controller/UserController';
import { Router } from 'express';
import queueRouter from './queue.routes';
import userRouter from './user.routes';

const router = Router();
const userController = new UserController();

router.post('/token', userController.authenticate);
router.use('/users', userRouter);
router.use('/queues', queueRouter);

export default router;
