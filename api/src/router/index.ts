import UserController from 'controller/UserController';
import { Router } from 'express';
import userRouter from './user.routes';

const router = Router();
const userController = new UserController();

router.post('/token', userController.authenticate);
router.use('/users', userRouter);

export default router;
