import User from 'models/User';
import { EntityManager, getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import ErrorHandler from 'utils/ErrorHandler';
import ERROR from '../../utils';
import authConfig from '../../configs/auth';
import CreateSessionToken from './CreateSessionToken';

interface AuthenticationParams {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  userId: string;
  session: {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  };
}

export default class AuthenticateUserService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async exec({
    email,
    password,
  }: AuthenticationParams): Promise<AuthenticationResponse> {
    const user = await this.entityManager.findOne(User, { where: { email } });

    if (!user) {
      throw new ErrorHandler(ERROR.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ErrorHandler(ERROR.INVALID_PASSWORD);
    }

    const session = CreateSessionToken(
      user.id,
      authConfig.accessTokenExpiresIn,
    );

    return { userId: user.id, session };
  }
}
