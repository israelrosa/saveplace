import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';
import ErrorHandler from '../utils/ErrorHandler';
import ERROR from '../utils';

interface ITokenPayload {
  userType: string;
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandler(ERROR.TOKEN_NOT_FOUND);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);
    const { sub, userType } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      type: userType,
    };

    return next();
  } catch (err) {
    throw new ErrorHandler(ERROR.INVALID_TOKEN);
  }
}

export default ensureAuthentication;
