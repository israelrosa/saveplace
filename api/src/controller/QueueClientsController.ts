import { Request, Response } from 'express';
import ExitQueueService from 'services/queueClient/ExitQueueService';
import JoinQueueService from 'services/queueClient/JoinQueueService';
import ShowCurrentQueueService from 'services/queueClient/ShowCurrentQueueService';

export default class QueueClientsController {
  async join(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { queueId } = request.body;

    const joinQueueService = new JoinQueueService();

    const queueClient = await joinQueueService.exec({
      queueId,
      userId: id,
    });

    return response.status(200).json(queueClient);
  }

  async quit(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { queueClientId } = request.params;

    const exitQueueService = new ExitQueueService();

    const queueClient = await exitQueueService.exec({
      userId: id,
      queueClientId,
    });

    return response.status(200).json(queueClient);
  }

  async currentQueue(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showCurrentQueueService = new ShowCurrentQueueService();

    const queueClient = await showCurrentQueueService.exec(id);

    return response.status(200).json(queueClient);
  }
}
