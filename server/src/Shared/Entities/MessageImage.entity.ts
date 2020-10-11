import { AbstractEntity } from './AbstractEntity.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Message } from './Message.entity';

@Entity()
export class MessageImages extends AbstractEntity {
    @ManyToOne(
        () => Message,
        message => message.images,
    )
    message: Message;
}
