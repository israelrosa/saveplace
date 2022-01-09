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
queuesRouter.get('/', queuesController.getAll);
queuesRouter.get('/:queueId/', ensureAuthentication(), queuesController.get);
queuesRouter.get(
  '/:queueId/clients',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.getClients,
);
);

export default queueRouter;
