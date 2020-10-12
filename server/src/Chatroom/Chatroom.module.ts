import { ChatService } from './Chatroom.service';
import { ChatControler } from './Chatroom.controller';
import { Chat } from '../Shared/Entities/Chat.entity';
import { User } from '../Shared/Entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/Shared/Entities/Message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Chat, Message])],
    controllers: [ChatControler],
    providers: [ChatService],
})
export class ChatroomModule {}
