import { FileModule } from './../FileUpload/FileUpload.module';
import { Tweet } from './../Shared/Entities/Tweet.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Shared/Entities/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Tweet]), FileModule],
    controllers: [],
    providers: [],
})
export class TweetModule {}
