import { EntityManager, getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import ErrorHandler from '../../utils/ErrorHandler';
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
      throw new ErrorHandler(ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ErrorHandler(ERROR.INVALID_CREDENTIALS);
    }

    const session = CreateSessionToken(
      user.id,
      user.type,
      authConfig.accessTokenExpiresIn,
    );

    return { userId: user.id, session };
  }
}
