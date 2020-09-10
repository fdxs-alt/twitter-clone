import { TweetImage } from './TweetImage.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    RelationCount,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/Shared/Entities/User.entity';

@Entity()
export class Tweet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    issuedAt: Date;

    @Column('varchar', { array: true })
    likes: string[];

    @ManyToOne(
        () => User,
        user => user.tweets,
    )
    user: User;

    @ManyToMany(() => User)
    @JoinTable()
    userRe: User[];

    @RelationCount((tweet: Tweet) => tweet.userRe)
    userReCount: number;

    @OneToMany(
        () => TweetImage,
        images => images.tweet,
    )
    images: Tweet[];
}
