import { Background } from './../FileUpload/Background.entity';
import { Avatar } from './../FileUpload/Avatar.entity';
import { FileService } from './../FileUpload/FileUpload.service';
import { UserService } from './User.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UserController } from './User.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Avatar, Background])],
    controllers: [UserController],
    providers: [UserService, FileService],
})
export class UserModule {}
