import { TweetInput } from './Tweet.dto';
import { Tweet } from './../Shared/Entities/Tweet.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from 'src/Shared/Entities/User.entity';
import { FileService } from 'src/FileUpload/FileUpload.service';

@Injectable()
export class TweetService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Tweet)
        private tweetRepository: Repository<Tweet>,
        private readonly fileService: FileService,
    ) {}

    async getAllUserTweets(id: string) {
        return this.tweetRepository.find({ where: { user: { id } } });
    }

    async postTweet(
        data: TweetInput,
        id: string,
        files?: Express.Multer.File[],
    ) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException({ message: 'Cannot identify user' });
        }

        const newTweet = this.tweetRepository.create({
            gif: data.gif,
            message: data.message,
            user,
        });

        if (files) {
            newTweet.images = await this.fileService.addImagesToTweet(files);
        }

        await newTweet.save();

        return newTweet;
    }
}
