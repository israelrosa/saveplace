import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';

interface QueueParams {
  userId: string;
  name: string;
  status: string;
  tagId: string;
}

export default class CreateQueueService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({ name, status, tagId, userId }: QueueParams): Promise<Queue> {
    const queue = await this.entityManager.create(Queue, {
      name,
      status,
      tagId,
      userId,
    });

    const result = await this.entityManager.save(queue);

    return result;
  }
}
