import {Datastore} from "../Datastore";
import {Comment, Like, Post, User} from "../../src/types";

export class InMemoryDatastore implements Datastore {
    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.email === email));
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.username === username));
    }

    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(p => p.id === id));
    }

    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1)
            return Promise.resolve();
        this.posts.splice(index, 1);
        return Promise.resolve();
    }

    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }

    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }

    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }

    deleteComment(id: string): Promise<void> {
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1)
            return Promise.resolve();
        this.comments.splice(index, 1);
        return Promise.resolve();
    }

    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(c => c.postId === postId));
    }
}