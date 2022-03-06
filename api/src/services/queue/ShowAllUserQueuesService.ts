import { EntityManager, getManager } from 'typeorm';
import Queue from '../../models/Queue';

export default class ShowAllUserQueuesService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string, status?: string): Promise<Queue[]> {
    const queues = await this.entityManager.find(Queue, {
      where: { userId, status },
      relations: ['clients'],
    });

    return queues;
  }
}
