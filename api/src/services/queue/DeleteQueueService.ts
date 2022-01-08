import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';
import ErrorHandler from 'utils/ErrorHandler';
import ERROR, { log } from 'utils';

interface QueueParams {
  userId: string;
  queueId: string;
}

export default class DeleteQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({ queueId, userId }: QueueParams): Promise<void> {
    const queue = await this.entityManager.findOne(Queue, queueId);

    if (!queue) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (queue.userId !== userId) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_PERMISSION);
    }

    try {
      await this.entityManager.delete(Queue, queueId);
    } catch {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }
    log.info(`Queue ${queueId} was deleted with success`);
  }
}
