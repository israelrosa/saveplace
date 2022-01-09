import { EntityManager, getManager } from 'typeorm';
import Queue from 'models/Queue';

export default class ShowAllUserQueuesService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string): Promise<Queue[]> {
    const queues = await this.entityManager.find(Queue, {
      where: { userId },
      relations: ['clients'],
    });

    return queues;
  }
}
