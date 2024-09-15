import express from 'express';
import { createPostHandler, listPostsHandler } from '../handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDb } from '../datastore/Datastore';
import { signInHandler, signUpHandler } from '../handlers/authHandler';
import { errorHandler } from '../middleware/errorMiddleware';
import { requestLoggerMiddleware } from '../middleware/loggerMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/authMiddleware';
import cors from 'cors';


(async () => {
    await initDb();
    dotenv.config();

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use(requestLoggerMiddleware);

    app.get('/healthz', (req, res) => res.send('Server Still Running\n'));
    app.post('/signup', asyncHandler(signUpHandler));
    app.post('/signin', asyncHandler(signInHandler));

    // app.use(authMiddleware);

    app.get('/posts', asyncHandler(listPostsHandler));
    app.post('/posts', asyncHandler(createPostHandler));

    app.use(errorHandler);
    app.listen(8000);
})();
