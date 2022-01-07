import { Request, Response } from 'express';
import CreateQueueService from 'services/queue/CreateQueueService';
import DeleteQueueService from 'services/queue/DeleteQueueService';

export default class QueueController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, status, tagId } = request.body;

    const createQueueService = new CreateQueueService();

    const queue = await createQueueService.exec({
      name,
      status,
      tagId,
      userId: id,
    });

    return response.status(200).json(queue);
  }

  async delete(request: Request, response: Response): Promise<Response> {
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
