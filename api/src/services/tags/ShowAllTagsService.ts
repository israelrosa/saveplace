import { EntityManager, getManager } from 'typeorm';
import Tag from '../../models/Tag';

export default class ShowAllTagsService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(): Promise<Tag[]> {
    const tags = await this.entityManager.find(Tag);

    return tags;
  }
}
