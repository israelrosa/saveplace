import QueueClientsController from 'controller/QueueClientsController';
import { Router } from 'express';
import ensureAuthentication from 'middlewares/ensureAuthentication';
import { UserType } from '../models/User';

const queueClientsRouter = Router();
const queueClientsController = new QueueClientsController();

queueClientsRouter.post(
  '/',
  ensureAuthentication(UserType.CLIENT),
  queueClientsController.join,
);
queueClientsRouter.patch(
  '/:queueClientId/actions/quit/',
  ensureAuthentication(UserType.CLIENT),
  queueClientsController.quit,
);

export default queueClientsRouter;
