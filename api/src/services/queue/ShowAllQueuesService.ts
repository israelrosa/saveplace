import { EntityManager, getManager } from 'typeorm';
import Queue from '../../models/Queue';

interface QueueQueries {
  search?: string;
  tagId?: string;
  skip: number;
  limit: number;
}

interface QueuePaginationResponse {
  total: number;
  items: Queue[];
}

export default class ShowAllQueuesService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({
    search,
    tagId,
    limit,
    skip,
  }: QueueQueries): Promise<QueuePaginationResponse> {
    const queryBuilder = this.entityManager
      .getRepository(Queue)
      .createQueryBuilder('queue')
      .leftJoinAndSelect(
        'queue.clients',
        'clients',
        'clients.queueId = queue.id',
      );

    if (search) {
      queryBuilder.andWhere(`queue.name LIKE '%${search}%'`);
    }
    if (tagId || tagId === '') {
      queryBuilder.andWhere('queue.tagId = :tag', { tag: tagId });
    }
    queryBuilder.skip(skip).take(limit);

    const [queues, total] = await queryBuilder.getManyAndCount();
    return { total, items: queues };
  }
}
