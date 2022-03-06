import { EntityManager, getManager } from 'typeorm';
import Tag from '../../models/Tag';
import ErrorHandler from '../../utils/ErrorHandler';
import ERROR from '../../utils';

export default class ShowOneTagService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(tagId: string): Promise<Tag> {
    const tag = await this.entityManager.findOne(Tag, tagId);

    if (!tag) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    return tag;
  }
}
