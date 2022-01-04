import { NextFunction, Request, Response } from 'express';

export default class ErrorHandler {
  public readonly id: string;

  public readonly message: string;

  public readonly statusCode: number;

  constructor(id: string, message: string, statusCode = 400) {
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
    return response.status(error.statusCode).json({
      status: 'error',
      id: error.id,
      message: error.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
