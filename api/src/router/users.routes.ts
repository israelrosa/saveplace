import { Router } from 'express';
import UsersController from '../controller/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import { UserType } from '../models/User';
import QueuesController from '../controller/QueuesController';

const usersRouter = Router();
const usersController = new UsersController();
const queuesController = new QueuesController();

usersRouter
  .route('/')
  .post(usersController.register)
  .get(ensureAuthentication(), usersController.get)
  .put(ensureAuthentication(), usersController.update);

usersRouter.get(
  '/queues/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.getAllUserQueues,
);
export default usersRouter;
