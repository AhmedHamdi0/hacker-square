import {UserDao} from "./dao/UserDao";
import {PostDao} from "./dao/PostDao";
import {LikeDao} from "./dao/LikeDao";
import {CommentDao} from "./dao/CommentDao";
import {InMemoryDatastore} from "./memoryDB/InMemoryDatastore";
import { SQLDatastore } from './sql/SQLDatastore';

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export let db: Datastore;

export async function initDb() {
    // db = new InMemoryDatastore();
    db = await new SQLDatastore().openDb();
}
