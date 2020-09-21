import { User } from './../Shared/Entities/User.entity';
import { Tweet } from './../Shared/Entities/Tweet.entity';
export class TweetInput {
    message: string;
    gif?: string;
    tags?: string[];
}
export interface TweetTable {
    tweet: Tweet;
    user: User;
}
