import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import User from 'models/User';
import ERROR from '../../utils';

export default class ShowUserInfoService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string): Promise<User> {
    const user = await this.entityManager.findOne(User, userId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    return user;
  }
}
