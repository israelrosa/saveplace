import { EntityManager, getManager } from 'typeorm';
import ErrorHandler from 'utils/ErrorHandler';
import RefreshToken from 'models/RefreshToken';
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
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    const session = CreateSessionToken(
      refreshToken.userId,
      authConfig.accessTokenExpiresIn,
    );

    return { userId: refreshToken.userId, session };
  }
}
