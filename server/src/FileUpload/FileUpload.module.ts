import { Avatar } from './../Shared/Entities/Avatar.entity';
import { Background } from './../Shared/Entities/Background.entity';
import { FileService } from './../FileUpload/FileUpload.service';
import { TweetImage } from './../Shared/Entities/TweetImage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([TweetImage, Background, Avatar])],
    exports: [
        TypeOrmModule.forFeature([TweetImage, Background, Avatar]),
        FileService,
    ],
    providers: [FileService],
})
export class FileModule {}
