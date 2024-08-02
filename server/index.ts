import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore/Datastore';
import { signInHandler, signUpHandler } from './handlers/userHandler';

(async () => {
    await initDb();
    const app = express();
    app.use(express.json());

    const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
        console.log(req.method, req.path, req.body);
        next();
    }

    const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
        console.log('Error:', error);
        return response.status(500).send('Oops, an unexpected error occurred, please try again!!');
    }

    app.get('/posts', asyncHandler(listPostsHandler));
    app.post('/posts', asyncHandler(createPostHandler));
    app.post('/signup', asyncHandler(signUpHandler))
    app.post('/signin', asyncHandler(signInHandler))

    app.use(errorHandler);
    app.use(requestLoggerMiddleware);

    app.listen(8000);
})();
