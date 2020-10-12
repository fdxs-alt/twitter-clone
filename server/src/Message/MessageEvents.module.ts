import { MessageImages } from '../Shared/Entities/MessageImage.entity';
import { Message } from '../Shared/Entities/Message.entity';
import { Chat } from '../Shared/Entities/Chat.entity';
import { User } from '../Shared/Entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../FileUpload/FileUpload.module';
import { MessageEventsGateway } from './MessageEvents.gateway';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Chat, Message, MessageImages]),
        FileModule,
    ],
    providers: [MessageEventsGateway],
})
export class MessageEventsModule {}
