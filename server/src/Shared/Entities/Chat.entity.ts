import { User } from './User.entity';
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
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

    @JoinColumn()
    @OneToOne(() => User, {
        eager: true,
    })
    creator?: User;

    @JoinColumn()
    @OneToOne(() => User, {
        eager: true,
    })
    answerer?: User;

    @OneToMany(
        () => Message,
        messages => messages.chat,
        { onDelete: 'CASCADE', nullable: true },
    )
    messages: Message[];
}
