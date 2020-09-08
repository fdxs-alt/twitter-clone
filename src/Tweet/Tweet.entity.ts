import { Entity, Column, CreateDateColumn, Tree } from 'typeorm';

@Tree('closure-table')
@Entity()
export class Tweet {
    @Column('text')
    message: string;

    @CreateDateColumn()
    issuedAt: Date;

    @Column('int', { default: 0 })
    likes: number;

    @Column('varchar', { default: [], array: true })
    retweets: string[];
}
