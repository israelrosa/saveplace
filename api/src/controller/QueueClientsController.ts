import { Request, Response } from 'express';
import DeleteQueueService from 'services/queue/DeleteQueueService';
import JoinQueueService from 'services/queueClient/JoinQueueService';

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
    const { queueId } = request.params;

    const deleteQueueService = new DeleteQueueService();

    await deleteQueueService.exec({
      queueId,
      userId: id,
    });

    return response.status(200);
  }
}
