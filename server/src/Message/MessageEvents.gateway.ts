import { SocketGuard } from './SocketGuard';
import { FileService } from '../FileUpload/FileUpload.service';
import { User } from '../Shared/Entities/User.entity';
import { Chat } from '../Shared/Entities/Chat.entity';
import { Message } from '../Shared/Entities/Message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    WsException,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ConnectedSocket } from './conntectedsocket';
import { UseGuards } from '@nestjs/common';

import moment from 'moment';
interface MessageInterface {
    content: string;
    gif?: string;
    chat: string;
    files: [
        {
            buffer: Buffer;
            name: string;
        },
    ];
}
@WebSocketGateway()
export class MessageEventsGateway implements OnGatewayConnection {
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
    server: ConnectedSocket;

    @UseGuards(SocketGuard)
    async handleConnection(data: string) {
        const event = 'joined';

        return this.server
            .to(data)
            .emit(event, { isActive: true, user: this.server.conn.userId });
    }

    @UseGuards(SocketGuard)
    @SubscribeMessage('message')
    async sendMessage(@MessageBody() data: MessageInterface) {
        const chat = await this.chatRepository.findOne({
            where: { id: data.chat },
        });

        const user = await this.userRepository.findOne({
            where: { id: this.server.conn.userId },
        });

        if (!user) throw new WsException({ message: 'User does not exist' });

        chat.lastActivity = (moment() as unknown) as Date;

        const message = this.messageRepository.create({
            chat,
            content: data.content,
            gif: data.gif,
            issuedBy: this.server.conn.userId,
        });

        if (!!data.files.length) {
            message.images = await this.fileService.addImagesToMessage(
                data.files,
            );
        }
        await message.save();

        return this.server.to(chat.id).emit('message', message);
    }

    @UseGuards(SocketGuard)
    @SubscribeMessage('delete')
    async deleteMessage(@MessageBody() data: string) {
        const message = await this.messageRepository.findOne({
            where: { id: data },
            relations: ['chat'],
        });

        const updatedChat = await this.chatRepository.findOne({
            where: { id: message.chat.id },
        });

        updatedChat.lastActivity = (moment() as unknown) as any;
        
        if (!message) throw new WsException({ message: 'Cannot find message' });

        await message.remove();

        return this.server
            .to(message.chat.id)
            .emit('deleted', { messageId: message.id });
    }
}
