import { db } from '../datastore/Datastore';
import crypto from 'crypto';
import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '../src/api';
import { ExpressHandler } from '../src/types';
// @ts-ignore
import { Post } from "@hackersquare/shared"

const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (request, response) => {
    response.send({ posts: await db.listPosts() });
}

const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (request, response) => {
    const b = request.body;
    if (!b.title || !b.url)
        return response.sendStatus(400);

    // TODO: validate user exists
    // TODO: get userId from session
    // TODO: validate title and url non-empty
    // TODO: validate url is new, otherwise add +1 to existing post
    const post: Post = {
        id: crypto.randomUUID(),
        title: b.title,
        url: b.url,
        userId: response.locals.userId,
        postedAt: Date.now(),
    }
    await db.createPost(post);
    response.sendStatus(200);
}

export {listPostsHandler, createPostHandler}