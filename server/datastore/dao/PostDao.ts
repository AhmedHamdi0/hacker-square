import { Post } from "../../src/types";

export interface PostDao {
    createPost(post: Post): Promise<void>;
    getPost(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
    listPosts(): Promise<Post[]>;
}