import { TweetControler } from './Tweet.controller';
import { FileModule } from './../FileUpload/FileUpload.module';
import { Tweet } from './../Shared/Entities/Tweet.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Shared/Entities/User.entity';
import { TweetService } from './Tweet.Service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Tweet]), FileModule],
    controllers: [TweetControler],
    providers: [TweetService],
})
export class TweetModule {}
