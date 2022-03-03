import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import ERROR, { log } from 'utils';
import authConfig from '../configs/auth';
import ErrorHandler from '../utils/ErrorHandler';

interface ITokenPayload {
  userType: string;
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthentication =
  (type?: string) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ErrorHandler(ERROR.TOKEN_NOT_FOUND);
      log.error(ERROR.TOKEN_NOT_FOUND.message);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.secret);
      const { sub, userType } = decoded as ITokenPayload;
      if (type && userType !== type) {
        throw new Error();
      }

      request.user = {
        id: sub,
        type: userType,
      };

      return next();
    } catch (err) {
      log.error(ERROR.INVALID_TOKEN.message);
      throw new ErrorHandler(ERROR.INVALID_TOKEN);
    }
  };

export default ensureAuthentication;
