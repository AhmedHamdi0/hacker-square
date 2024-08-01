import { Post } from "../types";

export interface PostDao {
    createPost(post: Post): void;
    getPost(id: string): Post | undefined;
    deletePost(id: string): void;
    listPosts(): Post[];
}