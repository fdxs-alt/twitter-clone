import { Tag } from './Tag.entity';
import { TweetImage } from './TweetImage.entity';
import {
    Entity,
    ManyToOne,
    ManyToMany,
    OneToMany,
    TreeChildren,
    TreeParent,
    Tree,
} from 'typeorm';
import { User } from './User.entity';
import { AbstractTweetEntity } from './AbstractTweetEntity.entity';

@Entity()
@Tree('closure-table')
export class Tweet extends AbstractTweetEntity {
    @ManyToOne(
        () => User,
        user => user.tweets,
    )
    user: User;

    @ManyToMany(
        () => User,
        user => user.retweets,
        { eager: true },
    )
    userRe: User[];

    @OneToMany(
        () => TweetImage,
        images => images.tweet,
        { eager: true },
    )
    images: TweetImage[];

    @ManyToMany(
        () => Tag,
        tag => tag.tweets,
        { eager: true },
    )
    tags: Tag[];

    @TreeParent()
    mainTweet: Tweet;

    @TreeChildren()
    comments: Tweet[];
}
