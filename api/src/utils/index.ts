import winston from 'winston';

export default {
  NEXT_CLIENT_DOES_NOT_EXIST: {
    id: 'next_client_does_not_exist',
    message: 'The next client is undefined',
    statusCode: 401,
  },
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
  INVALID_CREDENTIALS: {
    id: 'invalid_credentials',
    message: 'Invalid credentials',
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
  USER_ALREADY_JOINED_IN_QUEUE: {
    id: 'user_already_joined_in_queue',
    message: 'User already joined in a queue',
    statusCode: 401,
  },
  USER_ALREADY_EXITED_OR_ATTENDED: {
    id: 'user_already_exited_or_attended',
    message: 'User has already left or was attended in the queue',
    statusCode: 401,
  },
  USER_ALREADY_EXISTS: {
    id: 'user_already_exists',
    message: 'User already exists',
    statusCode: 401,
  },
  USER_DOES_NOT_HAVE_CURRENT_QUEUE: {
    id: 'user_does_not_have_current_queue',
    message: 'User does not have a current queue',
    statusCode: 401,
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
