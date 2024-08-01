import {Datastore} from "../Datastore";
import {Comment, Like, Post, User} from "../../types";

export class InMemoryDatastore implements Datastore {
    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    createUser(user: User) {
        this.users.push(user);
    }

    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email);
    }

    getUserByUsername(username: string): User | undefined {
        return this.users.find(u => u.username === username);
    }

    createPost(post: Post) {
        this.posts.push(post);
    }

    getPost(id: string): Post | undefined {
        return this.posts.find(p => p.id === id);
    }

    deletePost(id: string) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1)
            return;
        this.posts.splice(index, 1);
    }

    listPosts(): Post[] {
        return this.posts;
    }

    createLike(like: Like) {
        this.likes.push(like);
    }

    createComment(comment: Comment) {
        this.comments.push(comment);
    }

    deleteComment(id: string) {
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1)
            return;
        this.comments.splice(index, 1);
    }

    listComments(postId: string): Comment[] {
        return this.comments.filter(c => c.postId === postId);
    }
}