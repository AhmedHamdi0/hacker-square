import express, {ErrorRequestHandler, RequestHandler} from 'express';
import {createPostHandler, listPostsHandler} from "./handlers/postHandler";

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

app.use(errorHandler);
app.use(requestLoggerMiddleware);

app.get('/posts', listPostsHandler);
app.post('/posts', createPostHandler);

app.listen(3000);
