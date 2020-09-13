import { Tweet } from './Tweet.entity';
import { AbstractEntity } from './AbstractEntity.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class TweetImage extends AbstractEntity {
    @ManyToOne(
        () => Tweet,
        tweet => tweet.images,
    )
    tweet: Tweet;
}
