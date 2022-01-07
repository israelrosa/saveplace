import UserController from 'controller/UserController';
import { Router } from 'express';
import ensureAuthentication from 'middlewares/ensureAuthentication';

const userRouter = Router();
const userController = new UserController();

userRouter
  .route('/')
  .post(userController.register)
  .get(ensureAuthentication, userController.get)
  .put(ensureAuthentication, userController.update);

export default userRouter;
