import { ExpressHandler } from '../src/types';
import { verifyJwt } from '../src/auth';
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

        response.locals.userId = user.id;
        next();
    } catch {
        return response.status(401).send({error: 'Bad Token'});
    }
}