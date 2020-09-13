import { Tag } from './Tag.entity';
import { TweetImage } from './TweetImage.entity';
import { Entity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { AbstractTweetEntity } from './AbstractTweetEntity.entity';

@Entity()
export class Tweet extends AbstractTweetEntity {
    @ManyToOne(
        () => User,
        user => user.tweets,
    )
    user: User;

    @ManyToMany(
        () => User,
        user => user.retweets,
        { eager: true, onDelete: 'CASCADE' },
    )
    userRe: User[];

    @OneToMany(
        () => TweetImage,
        images => images.tweet,
        { eager: true, onDelete: 'CASCADE' },
    )
    images: TweetImage[];

    @ManyToMany(
        () => Tag,
        tag => tag.tweets,
        { eager: true },
    )
    tags: Tag[];

    @ManyToOne(
        () => Tweet,
        tweet => tweet.comments,
        { onDelete: 'CASCADE' },
    )
    mainTweet: Tweet;

    @OneToMany(
        () => Tweet,
        comments => comments.mainTweet,
    )
    comments: Tweet[];
}
