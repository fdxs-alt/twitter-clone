import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

export abstract class AbstractTweetEntity extends BaseEntity {
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
}
