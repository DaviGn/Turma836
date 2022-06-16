import { Request, Response } from 'express';

export default async function logMiddleware(
    request: Request,
    response: Response,
    next: any
) {
    const { method, url } = request;
    const requestLabel = `${method} ${url}`;
    console.info(requestLabel);
    console.time();
    await next();
    console.timeEnd();
}
