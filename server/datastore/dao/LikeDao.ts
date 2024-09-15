import {Like} from "../../src/types";

export interface LikeDao {
    createLike(like: Like): Promise<void>;
}