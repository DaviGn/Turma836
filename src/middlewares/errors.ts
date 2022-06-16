import { NextFunction, Request, Response } from 'express';
import FieldException from '../exceptions/fieldExceptions';
import { genericExceptionMessage } from '../utils/constants';

export default async function errorsMiddleware(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (err instanceof FieldException)
        return response.send(err.errors).status(err.statusCode);

    return response.send({
        message: genericExceptionMessage,
    });
}
