import { User } from './User.entity';
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message.entity';

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    lastActivity: Date;

    @ManyToOne(
        () => User,
        user => user.rcreated,
        { eager: true },
    )
    creator: User;

    @ManyToOne(
        () => User,
        user => user.ranswered,
        { eager: true },
    )
    answerer: User;

    @OneToMany(
        () => Message,
        messages => messages.chat,
        {
            onDelete: 'CASCADE',
            nullable: true,
            deferrable: 'INITIALLY DEFERRED',
        },
    )
    messages: Message[];
}
