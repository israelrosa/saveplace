import winston from 'winston';

export default {
  DATABASE_ERROR: {
    id: 'database_error',
    message: 'Database error',
    statusCode: 401,
  },
  TOKEN_NOT_FOUND: {
    id: 'token_not_found',
    message: 'Token not found',
    statusCode: 401,
  },
  INVALID_TOKEN: {
    id: 'invalid_token',
    message: 'Invalid token',
    statusCode: 401,
  },
  INVALID_RESOURCE: {
    id: 'invalid_resource',
    message: 'Invalid resource',
    statusCode: 422,
  },
  INVALID_PASSWORD: {
    id: 'invalid_password',
    message: 'Invalid password',
    statusCode: 422,
  },
  INVALID_USER_TYPE: {
    id: 'invalid_user_type',
    message: 'Invalid user type',
    statusCode: 422,
  },
  INVALID_USER: {
    id: 'invalid_user',
    message: 'Invalid user',
    statusCode: 422,
  },
  USER_NOT_FOUND: {
    id: 'invalid_user',
    message: 'User not found',
    statusCode: 422,
  },
  USER_DOES_NOT_HAVE_PERMISSION: {
    id: 'user_does_not_have_permission',
    message: 'User does not have permission',
    statusCode: 401,
  },
};

const logFormat = winston.format.printf(
  ({ level, message, timestamp }) => `${level} ${timestamp}] ${message}`,
);

export const log = winston.createLogger({
  level: process.env.ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
});
