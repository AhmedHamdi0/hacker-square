import {Post} from "./types";

/* Post APIs */
// List Posts APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[];
}
// Create Post APIs
export type CreatePostRequest = Pick<Post, 'title'|'url'|'userId'>
export interface CreatePostResponse {}
// Get Post APIs
export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post;
}


/* TODO: User APIs */
/* TODO: Comment APIs */
/* TODO: Like APIs */
