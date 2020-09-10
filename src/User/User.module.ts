import { FileModule } from './../FileUpload/FileUpload.module';
import { UserService } from './User.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Shared/Entities/User.entity';
import { UserController } from './User.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), FileModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
