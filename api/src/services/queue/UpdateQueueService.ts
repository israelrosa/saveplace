import { EntityManager, getManager } from 'typeorm';
import Queue from '../../models/Queue';
import ERROR, { log } from '../../utils';
import ErrorHandler from '../../utils/ErrorHandler';

interface QueueParams {
  queueId: string;
  userId: string;
  name: string;
  status: string;
  tagId: string;
}

export default class UpdateQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({
    name,
    status,
    tagId,
    userId,
    queueId,
  }: QueueParams): Promise<void> {
    const queue = await this.entityManager.findOne(Queue, queueId);

    if (!queue) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (userId !== queue.userId) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_PERMISSION);
    }

    Object.assign(queue, {
      name,
      status,
      tagId,
    });

    try {
      await this.entityManager.save(queue);
    } catch (error) {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }

    log.info(`Queue ${queueId} updated by user ${userId}`);
  }
}
