import { sign } from 'jsonwebtoken';
import authConfig from '../../configs/auth';

export default function CreateSessionToken(
  userId: string,
  userType: string,
  expiresTime: string,
) {
  const token = sign({ userType }, authConfig.secret, {
    subject: userId,
    expiresIn: `${expiresTime}s`,
  });

  const result = {
    accessToken: token,
    tokenType: 'Bearer',
    expiresIn: expiresTime,
  };

  return result;
}
