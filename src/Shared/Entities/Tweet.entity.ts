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
    BaseEntity,
} from 'typeorm';
import { User } from 'src/Shared/Entities/User.entity';

@Entity()
export class Tweet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    issuedAt: Date;

    @Column('varchar', { array: true, nullable: true })
    likes: string[];

    @Column('text', { nullable: true })
    gif: string;

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
        { eager: true },
    )
    images: TweetImage[];
}
