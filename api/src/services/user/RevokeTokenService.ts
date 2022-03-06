import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from '../../utils/ErrorHandler';
import RefreshToken from '../../models/RefreshToken';
import ERROR from '../../utils';

export default class RevokeTokenService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string, refreshToken: string): Promise<void> {
    const findedRefreshToken = await this.entityManager.findOne(RefreshToken, {
      where: { token: refreshToken },
    });

    if (!findedRefreshToken) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (findedRefreshToken.userId === userId) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_PERMISSION);
    }

    try {
      this.entityManager.delete(RefreshToken, findedRefreshToken);
    } catch (error) {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }
  }
}
