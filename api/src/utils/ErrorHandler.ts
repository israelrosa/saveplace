import { NextFunction, Request, Response } from 'express';
import { log } from '.';

interface ErrorParams {
  id: string;
  message: string;
  statusCode: number;
}
export default class ErrorHandler {
  public readonly id: string;

  public readonly message: string;

  public readonly statusCode: number;

  constructor({ id, message, statusCode = 400 }: ErrorParams) {
    this.id = id;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof ErrorHandler) {
    log.error(error.message);
    return response.status(error.statusCode).json({
      status: 'error',
      id: error.id,
      message: error.message,
    });
  }

  log.error(error);
  // eslint-disable-next-line no-console
  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
