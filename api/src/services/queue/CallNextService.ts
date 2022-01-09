import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';
import ERROR, { log } from 'utils';
import ErrorHandler from 'utils/ErrorHandler';
import QueueClient, { QueueClientType } from 'models/QueueClient';
import moment from 'moment';

export default class CallNextService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(queueId: string): Promise<Queue> {
    let queue;
    try {
      queue = await this.entityManager.findOne(Queue, queueId, {
        relations: ['clients'],
      });

      if (!queue) {
        throw new ErrorHandler(ERROR.INVALID_RESOURCE);
      }
    } catch (error) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (!queue.nextClient()) {
      await this.setCurrentClientStatusAsAttended(queueId);
      throw new ErrorHandler(ERROR.NEXT_CLIENT_DOES_NOT_EXIST);
    }

    const nextClient = await this.entityManager.findOne(
      QueueClient,
      queue.nextClient(),
    );

    if (!nextClient) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    await this.entityManager.update(Queue, queueId, {
      currentCode: nextClient.code,
    });

    await this.setCurrentClientStatusAsAttended(queueId);

    await this.entityManager.update(QueueClient, nextClient.id, {
      status: QueueClientType.CURRENT,
    });

    log.info(`Queue ${queue.id} call the next client ${nextClient.id}`);

    const updatedQueue = await this.entityManager.findOne(Queue, queueId, {
      relations: ['clients'],
    });

    if (!updatedQueue) {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }

    return updatedQueue;
  }

  private async setCurrentClientStatusAsAttended(queueId: string) {
    const currentClient = await this.entityManager.findOne(QueueClient, {
      where: { queueId, status: QueueClientType.CURRENT },
    });

    if (currentClient) {
      await this.entityManager.update(QueueClient, currentClient.id, {
        status: QueueClientType.ATTENDED,
        attendedOn: moment.utc(),
      });
      log.info(`Client ${currentClient.id} was attended`);
    }
  }
}
