import { Post, User } from './types';

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[];
}

export type CreatePostRequest = Pick<Post, 'title'|'url'|'userId'>
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post;
}


// User APIs
export type SignUpRequest = Pick<User, 'firstName'|'lastName'|'username'|'email'|'password'>
export interface SignUpResponse{
    jwt: string;
}

export interface SignInRequest {
    login: string; // username or email
    password: string;
}
export type SignInResponse = {
    user: Pick<User, 'id'|'firstName'|'lastName'|'username'|'email'>;
    jwt: string;
}


// TODO: Comment APIs
//  TODO: Like APIs
