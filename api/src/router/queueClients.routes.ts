import QueueClientsController from 'controller/QueueClientsController';
import { Router } from 'express';
import ensureAuthentication from 'middlewares/ensureAuthentication';
import { UserType } from '../models/User';

const queueClientsRouter = Router();
const queueClientsController = new QueueClientsController();

queueClientsRouter
  .route('/')
  .post(ensureAuthentication(UserType.CLIENT), queueClientsController.join)
  .get(
    ensureAuthentication(UserType.CLIENT),
    queueClientsController.currentQueue,
  );
queueClientsRouter.patch(
  '/:queueClientId/actions/quit/',
  ensureAuthentication(UserType.CLIENT),
  queueClientsController.quit,
);

export default queueClientsRouter;
