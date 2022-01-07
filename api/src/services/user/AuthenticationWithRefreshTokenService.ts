import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import RefreshToken from 'models/RefreshToken';
import User from 'models/User';
import ERROR from '../../utils';
import authConfig from '../../configs/auth';
import CreateSessionToken from './CreateSessionToken';

interface AuthenticationResponse {
  userId: string;
  session: {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  };
}

export default class AuthenticateWithRefreshTokenService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec(token: string): Promise<AuthenticationResponse> {
    const refreshToken = await this.entityManager.findOne(RefreshToken, {
      where: { token },
    });

    if (!refreshToken) {
      throw new ErrorHandler(ERROR.INVALID_TOKEN);
    }

    const user = await this.entityManager.findOne(User, refreshToken.userId);

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    const session = CreateSessionToken(
      user.id,
      user.type,
      authConfig.accessTokenExpiresIn,
    );

    return { userId: refreshToken.userId, session };
  }
}
