import RefreshToken from 'models/RefreshToken';
import { EntityManager, getManager } from 'typeorm';
import { uid } from 'rand-token';
import moment from 'moment';
import authConfig from '../../configs/auth';

export default class CreateRefreshToken {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(userId: string): Promise<string> {
    const currentRefreshToken = await this.entityManager.findOne(RefreshToken, {
      where: { userId },
    });

    const token = uid(128);

    const expireAt = moment.utc().startOf('day');
    expireAt.add(Number(authConfig.refreshTokenExpiresIn), 'seconds');

    if (currentRefreshToken) {
      await this.entityManager.update(RefreshToken, currentRefreshToken.id, {
        userId,
        token,
        expireAt,
      });

      return token;
    }
    const refrestToken = await this.entityManager.create(RefreshToken, {
      userId,
      token,
      expireAt,
    });
    await this.entityManager.save(refrestToken);

    return token;
  }
}
