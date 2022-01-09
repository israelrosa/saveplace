import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';
import QueueClient, { QueueClientType } from 'models/QueueClient';
import ErrorHandler from 'utils/ErrorHandler';
import ERROR, { log } from 'utils';

interface QueueClientParams {
  userId: string;
  queueId: string;
}

export default class JoinQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({ userId, queueId }: QueueClientParams): Promise<QueueClient> {
    const queue = await this.entityManager.findOne(Queue, queueId);

    if (!queue || queue.userId === userId) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

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

    if (currentQueue) {
      throw new ErrorHandler(ERROR.USER_ALREADY_JOINED_IN_QUEUE);
    }

    const code = queue.lastGeneratedCode() + 1;

    const queueClient = await this.entityManager.create(QueueClient, {
      userId,
      queueId,
      code,
    });

    const result = await this.entityManager.save(queueClient);

    log.info(`User ${userId} was joinned the queue ${queueId}`);

    return result;
  }
}
