import {
    Entity,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Tweet } from './Tweet.entity';

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    text: string;

    @ManyToMany(
        () => Tweet,
        tweet => tweet.tags,
    )
    @JoinTable()
    tweets?: Tweet[];
}
