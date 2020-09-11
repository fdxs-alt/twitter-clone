import { Tag } from './Tag.entity';
import { TweetImage } from './TweetImage.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
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
}
