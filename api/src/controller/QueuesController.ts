import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import CallNextService from '../services/queue/CallNextService';
import CreateQueueService from '../services/queue/CreateQueueService';
import DeleteQueueService from '../services/queue/DeleteQueueService';
import ShowAllQueuesService from '../services/queue/ShowAllQueuesService';
import ShowAllUserQueuesService from '../services/queue/ShowAllUserQueuesService';
import ShowQueueClientsService from '../services/queue/ShowQueueClientsService';
import ShowQueueService from '../services/queue/ShowQueueService';
import UpdateQueueService from '../services/queue/UpdateQueueService';

export default class QueuesController {
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

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, status, tagId } = request.body;
    const { queueId } = request.params;

    const updateQueueService = new UpdateQueueService();

    await updateQueueService.exec({
      queueId,
      name,
      status,
      tagId,
      userId: id,
    });

    return response.status(200).json();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { queueId } = request.params;

    const deleteQueueService = new DeleteQueueService();

    await deleteQueueService.exec({
      queueId,
      userId: id,
    });

    return response.status(200).json();
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { queueId } = request.params;
    const showQueueService = new ShowQueueService();

    const queue = await showQueueService.exec(queueId);
    return response.status(200).json(instanceToPlain(queue));
  }

  async getClients(request: Request, response: Response): Promise<Response> {
    const { queueId } = request.params;

    const showQueueClientsService = new ShowQueueClientsService();

    const clients = await showQueueClientsService.exec(queueId);
    return response.status(200).json(instanceToPlain(clients));
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { search, tagId, limit, skip } = request.query;

    const showAllQueuesService = new ShowAllQueuesService();
    const queues = await showAllQueuesService.exec({
      search: search ? String(search) : undefined,
      tagId: tagId ? String(tagId) : undefined,
      skip: Number(skip),
      limit: Number(limit),
    });

    return response.status(200).json(instanceToPlain(queues));
  }

  async getAllUserQueues(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { status } = request.query;

    let statusParsed;
    if (status) {
      statusParsed = String(status);
    }

    const showAllUserQueuesService = new ShowAllUserQueuesService();
    const queues = await showAllUserQueuesService.exec(id, statusParsed);

    return response.status(200).json(instanceToPlain(queues));
  }

  async callNextClient(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { queueId } = request.params;

    const callNextService = new CallNextService();
    const queue = await callNextService.exec(queueId);

    return response.status(200).json(instanceToPlain(queue));
  }
}
