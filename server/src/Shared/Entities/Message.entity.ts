import { Chat } from './Chat.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageImages } from './MessageImage.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    issuedAt: Date;

    @Column('text', { nullable: true })
    gif: string;

    @ManyToOne(
        () => Chat,
        chat => chat.messages,
    )
    chat: Chat;

    @OneToMany(
        () => MessageImages,
        images => images.message,
        { eager: true, onDelete: 'CASCADE' },
    )
    images: MessageImages[];
}
