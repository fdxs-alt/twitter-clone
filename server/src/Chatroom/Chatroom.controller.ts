import { AuthGuard } from './../Shared/AuthGuard';
import { ChatService } from './Chatroom.service';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/User/User.decorator';

@Controller('chat')
export class ChatControler {
    constructor(private chatService: ChatService) {}

    @Post('/create/:userId')
    @UseGuards(AuthGuard)
    createChat(@User('id') id: string, @Param('id') userId: string) {
        return this.chatService.createChat(id, userId);
    }

    @Get('/messages/:chat/:page')
    @UseGuards(AuthGuard)
    getMessages(@Param('chat') chat: string, @Param('page') page: number) {
        return this.chatService.getMessages(page, chat);
    }
}
