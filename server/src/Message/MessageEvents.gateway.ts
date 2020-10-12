import { FileService } from '../FileUpload/FileUpload.service';
import { User } from '../Shared/Entities/User.entity';
import { Chat } from '../Shared/Entities/Chat.entity';
import { Message } from '../Shared/Entities/Message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class MessageEventsGateway {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        private readonly fileService: FileService,
    ) {}

    @WebSocketServer()
    server: Server;
}
