import { EntityManager, getManager } from 'typeorm';
import QueueClient, { QueueClientType } from 'models/QueueClient';
import ErrorHandler from 'utils/ErrorHandler';
import ERROR from 'utils';

export default class ShowCurrentQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string): Promise<QueueClient> {
    const currentQueue = await this.entityManager
      .getRepository(QueueClient)
      .createQueryBuilder('client')
      .andWhere(
        'client.status = :firstStatus or client.status = :secondStatus',
        {
          firstStatus: QueueClientType.WAITING,
          secondStatus: QueueClientType.CURRENT,
        },
      )
      .andWhere('client.userId = :userId', { userId })
      .getOne();

    if (!currentQueue) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_CURRENT_QUEUE);
    }

    return currentQueue;
  }
}
