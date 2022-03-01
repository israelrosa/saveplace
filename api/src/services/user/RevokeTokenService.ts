import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import RefreshToken from 'models/RefreshToken';
import ERROR from '../../utils';

export default class RevokeTokenService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string, refreshTokenId: string): Promise<void> {
    const refreshToken = await this.entityManager.findOne(
      RefreshToken,
      refreshTokenId,
    );

    if (!refreshToken) {
      throw new ErrorHandler(ERROR.INVALID_RESOURCE);
    }

    if (refreshToken.userId === userId) {
      throw new ErrorHandler(ERROR.USER_DOES_NOT_HAVE_PERMISSION);
    }

    try {
      this.entityManager.delete(refreshToken);
    } catch (error) {
      throw new ErrorHandler(ERROR.DATABASE_ERROR);
    }
  }
}
