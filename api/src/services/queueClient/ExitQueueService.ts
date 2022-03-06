import { EntityManager, getManager } from 'typeorm';
import QueueClient, { QueueClientType } from '../../models/QueueClient';
import ErrorHandler from '../../utils/ErrorHandler';
import ERROR, { log } from '../../utils';

interface QueueClientParams {
  userId: string;
  queueClientId: string;
}

export default class ExitQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({
    queueClientId,
    userId,
  }: QueueClientParams): Promise<QueueClient> {
    const queueClient = await this.entityManager.findOne(
      QueueClient,
      queueClientId,
    );

    if (!queueClient) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (queueClient.userId !== userId) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_PERMISSION);
    }

    if (queueClient.status === QueueClientType.ATTENDED) {
      throw new ErrorHandler(ERROR.USER_ALREADY_EXITED_OR_ATTENDED);
    }
    queueClient.status = QueueClientType.EXITED;

    const updatedQueueClient = await this.entityManager.save(
      QueueClient,
      queueClient,
    );

    log.info(`User ${userId} was left the queue ${queueClient.queueId}`);

    return updatedQueueClient;
  }
}
