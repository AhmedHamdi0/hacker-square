import {RequestHandler} from "express";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

interface Like {
    userId: string;
    postId: string;
}

interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: string;
}

export type ExpressHandler<Req, Res> = RequestHandler<
    string,
    Partial<Res>,
    Partial<Req>,
    any
>

export type { User, Post, Like, Comment };
