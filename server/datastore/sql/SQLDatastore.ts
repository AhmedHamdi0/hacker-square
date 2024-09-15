import { Datastore } from '../Datastore';
// @ts-ignore
import { Comment, Like, Post, User } from '@hackersquare/shared';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';


export class SQLDatastore implements Datastore {
    private db!: Database<sqlite3.Database,sqlite3.Statement>;
    public async openDb() {
        this.db = await open({
            filename: path.join(__dirname, 'hacker-square.sqlite'),
            driver: sqlite3.Database
        })

        this.db.run('PRAGMA foreign_keys = ON;')

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        })

        return this;
    }

    async createPost(post: Post): Promise<void> {
            await this.db.run('INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)',
            post.id, post.title, post.url, post.userId, post.postedAt)
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(undefined);
    }

    deletePost(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }

    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (id, firstName, lastName, userName, email, password) VALUES (?,?,?,?,?,?)',
            user.id, user.firstName, user.lastName, user.username, user.email, user.password)
    }

    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id)
    }


    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email)
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE username = ?`, username)
    }

    createComment(comment: Comment): Promise<void> {
        return Promise.resolve(undefined);
    }

    deleteComment(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve([]);
    }

    createLike(like: Like): Promise<void> {
        return Promise.resolve(undefined);
    }
}