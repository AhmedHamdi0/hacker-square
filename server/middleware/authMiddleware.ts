import { ExpressHandler } from '../types';
import { verifyJwt } from '../auth';
import { db } from '../datastore/Datastore';

export const authMiddleware: ExpressHandler<any, any> = async (request, response, next) => {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
        return response.sendStatus(401);
    }

    try {
        const payload = verifyJwt(token);
        const user = await db.getUserById(payload.userId);
        if (!user) {
            throw 'Not Found'
        }

        next();
    } catch {
        return response.status(401).send({error: 'Bad Token'});
    }
}