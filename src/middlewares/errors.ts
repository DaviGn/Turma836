import { NextFunction, Request, Response } from 'express';
import AuthException from '../exceptions/authException';
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

    if (err instanceof AuthException)
        return response.send({ message: err.message }).status(err.statusCode);

    return response.send({
        message: genericExceptionMessage,
    });
}
