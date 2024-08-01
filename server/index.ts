import express, { RequestHandler } from 'express';
import {db} from "./datastore/Datastore";

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
    console.log(req.method, req.path, req.body);
    next();
}
app.use(requestLoggerMiddleware);

app.get('/posts', (_, response) => {
    response.send({ posts: db.listPosts() });
});

app.post('/posts', (request, response) => {
    const post = request.body;
    db.createPost(post)
    response.sendStatus(200);    
});

app.listen(3000);
