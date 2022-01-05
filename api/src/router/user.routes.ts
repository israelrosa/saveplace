import UserController from 'controller/UserController';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.register);

export default userRouter;
