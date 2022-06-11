import { Request, Response } from 'express';
import FieldException from '../exceptions/fieldExceptions';
import { genericExceptionMessage } from '../utils/constants';

export default async function errorsMiddleware(
  err: any,
  request: Request,
  response: Response,
  next: any
) {
  if (err instanceof FieldException)
    return response.send(err.errors).status(err.statusCode);

  return response.send({
    message: genericExceptionMessage,
  });
}
