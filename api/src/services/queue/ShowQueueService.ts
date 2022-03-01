import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';
import ERROR from 'utils';
import ErrorHandler from 'utils/ErrorHandler';

export default class ShowQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(queueId: string): Promise<Queue> {
    let queue;
    try {
      queue = await this.entityManager.findOne(Queue, queueId, {
        relations: ['clients', 'user'],
      });

      if (!queue) {
        throw new ErrorHandler(ERROR.INVALID_RESOURCE);
      }
    } catch (error) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }
    console.log(queue);
    return queue;
  }
}
