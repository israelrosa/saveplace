import { EntityManager, getManager } from 'typeorm';
import ERROR from 'utils';
import ErrorHandler from 'utils/ErrorHandler';
import QueueClient from 'models/QueueClient';

export default class ShowQueueClientsService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(queueId: string): Promise<QueueClient[]> {
    let clients;
    try {
      clients = await this.entityManager.find(QueueClient, {
        where: { queueId },
      });

      if (!clients) {
        throw new ErrorHandler(ERROR.INVALID_RESOURCE);
      }
    } catch (err) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    return clients;
  }
}
