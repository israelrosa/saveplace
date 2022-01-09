import UserController from 'controller/UserController';
import { Router } from 'express';
import queueRouter from './queue.routes';
import userRouter from './user.routes';

const router = Router();
const userController = new UserController();

router.use('/tags', tagsRouter);

export default router;
