import { Chat } from '../Shared/Entities/Chat.entity';
import { User } from '../Shared/Entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from 'src/Shared/Entities/Message.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    async createChat(creatorId: string, id: string) {
        const creator = await this.userRepository.findOne({
            where: { id: creatorId },
        });

        if (!creator) {
            throw new BadRequestException({ message: 'User not found' });
        }

        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException({ message: 'User not found' });
        }

        const chat = this.chatRepository.create({
            answerer: user,
            creator,
            messages: [],
        });

        await chat.save();

        return chat;
    }

    async getMessages(page: number, id: string) {
        const chat = await this.chatRepository.findOne({ where: { id } });

        const messages = await this.messageRepository.find({
            where: { chat },
            skip: page * 10,
            take: 10,
        });

        return messages;
    }

    async deleteChat(chatId: string) {
        const chat = await this.chatRepository.findOne({
            where: { id: chatId },
        });

        if (!chat)
            throw new BadRequestException({ message: 'Cannot find chat' });

        await chat.remove();

        return true;
    }

    async getUserChats(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException({ message: 'Cannot find user' });
        }

        const chats = await this.chatRepository.find({
            where: [
                { creator: { id: user.id } },
                { answerer: { id: user.id } },
            ],
        });

        return chats;
    }
}
