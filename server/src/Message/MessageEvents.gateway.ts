import { SocketGuard } from './SocketGuard';
import { FileService } from '../FileUpload/FileUpload.service';
import { User } from '../Shared/Entities/User.entity';
import { Chat } from '../Shared/Entities/Chat.entity';
import { Message } from '../Shared/Entities/Message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    WsException,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ConnSocket } from './conntectedsocket';
import { UseGuards } from '@nestjs/common';
import moment from 'moment';
import { verify } from 'jsonwebtoken';

interface MessageInterface {
    content: string;
    gif?: string;
    chat: string;
    files?: [
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

    @UseGuards(SocketGuard)
    async handleConnection(@ConnectedSocket() client: ConnSocket) {
        const event = 'joined';

        const query = client.handshake.query.token;

        if (!query) {
            return false;
        }

        const queryToken = query.split(' ');

        if (queryToken[0] !== 'Bearer') {
            throw new WsException({ message: 'User unauthorized' });
        }

        const decoded = this.validateToken(queryToken[1]);
        client.join(client.handshake.query.id);

        return client
            .to(client.handshake.query.id)
            .emit(event, { isActive: true, userId: decoded.id });
    }

    @UseGuards(SocketGuard)
    @SubscribeMessage('message')
    async sendMessage(
        @ConnectedSocket() client: ConnSocket,
        @MessageBody() data: MessageInterface,
    ) {
        const chat = await this.chatRepository.findOne({
            where: { id: data.chat },
        });

        const user = await this.userRepository.findOne({
            where: { id: client.conn.decoded.id },
        });

        if (!user) throw new WsException({ message: 'User does not exist' });

        chat.lastActivity = (moment() as unknown) as Date;

        const message = this.messageRepository.create({
            chat,
            content: data.content,
            gif: '',
            issuedBy: client.conn.decoded.id,
        });

        if (data.files && !!data.files.length) {
            message.images = await this.fileService.addImagesToMessage(
                data.files,
            );
        }

        await message.save();
        client.emit('mess', message);
        return client.broadcast.emit('mess', message);
    }

    @UseGuards(SocketGuard)
    @SubscribeMessage('delete')
    async deleteMessage(client: ConnSocket, data: string) {
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

        return client
            .to(message.chat.id)
            .emit('deleted', { messageId: message.id });
    }

    validateToken(token: string) {
        try {
            const decoded = verify(token, process.env.ACCESS);
            return decoded as { exp: number; iat: number; id: string };
        } catch (error) {
            throw new WsException({ message: 'User unauthorized' });
        }
    }
}
