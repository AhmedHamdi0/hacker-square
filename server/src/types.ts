import { RequestHandler } from 'express';

type WithError<T> = T & {error: string};

export type ExpressHandler<Req, Res> = RequestHandler<
    string,
    Partial<WithError<Res>>,
    Partial<Req>,
    any
>

export interface JwtObject {
    userId: string
}
