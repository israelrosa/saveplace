import { Router } from 'express';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import QueuesController from '../controller/QueuesController';
import { UserType } from '../models/User';

const queuesRouter = Router();
const queuesController = new QueuesController();

queuesRouter.post(
  '/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.create,
);
queuesRouter.get('/', queuesController.getAll);
queuesRouter.get('/:queueId/', queuesController.get);
queuesRouter.put(
  '/:queueId/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.update,
);
queuesRouter.delete(
  '/:queueId/',
  ensureAuthentication(UserType.ESTABLISHMENT),
  queuesController.delete,
);
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
