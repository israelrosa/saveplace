import QueueController from 'controller/QueueController';
import { Router } from 'express';
import ensureAuthentication from 'middlewares/ensureAuthentication';
import { UserType } from '../models/User';

const queueRouter = Router();
const queueController = new QueueController();

queueRouter.post(
  '/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queueController.create,
);
queueRouter.delete(
  '/:queueId/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queueController.delete,
);

export default queueRouter;
