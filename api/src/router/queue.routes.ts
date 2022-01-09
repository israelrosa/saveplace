import QueuesController from 'controller/QueuesController';
import { Router } from 'express';
import ensureAuthentication from 'middlewares/ensureAuthentication';
import { UserType } from '../models/User';

const queuesRouter = Router();
const queuesController = new QueuesController();

queuesRouter.post(
  '/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.create,
);
queuesRouter.delete(
  '/:queueId/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.delete,
);
queuesRouter.get('/', queuesController.getAll);
queuesRouter.get('/:queueId/', ensureAuthentication(), queuesController.get);
queuesRouter.get(
  '/:queueId/clients',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.getClients,
);
queuesRouter.patch(
  '/:queueId/actions/call/next/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.callNextClient,
);

export default queuesRouter;
