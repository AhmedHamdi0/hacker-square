import express from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore/Datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { errorHandler } from './middleware/errorMiddleware';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';

(async () => {
    await initDb();
    const app = express();
    app.use(express.json());

    app.get('/posts', asyncHandler(listPostsHandler));
    app.post('/posts', asyncHandler(createPostHandler));
    app.post('/signup', asyncHandler(signUpHandler))
    app.post('/signin', asyncHandler(signInHandler))

    app.use(errorHandler);
    app.use(requestLoggerMiddleware);

    app.listen(8000);
})();
