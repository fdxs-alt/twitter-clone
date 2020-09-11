import { Tag } from './../Shared/Entities/Tag.entity';
import { TweetInput } from './Tweet.dto';
import { Tweet } from './../Shared/Entities/Tweet.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';
import { User } from '../Shared/Entities/User.entity';
import { FileService } from '../FileUpload/FileUpload.service';

@Injectable()
export class TweetService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Tweet)
        private tweetRepository: Repository<Tweet>,
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        private readonly fileService: FileService,
    ) {}

    async getAllUserTweets(id: string) {
        const userRetweets = await this.userRepository.findOne({
            where: { id },
            relations: ['retweets'],
        });
        const userTweets = await this.tweetRepository.find({
            where: { user: { id } },
        });
        const allUserTweets = [...userRetweets.retweets, ...userTweets].sort(
            this.sortingFunction,
        );

        return allUserTweets;
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
            tags: [],
        });

        if (files) {
            newTweet.images = await this.fileService.addImagesToTweet(files);
        }

        if (data.tags.length !== 0) {
            await Promise.all(
                data.tags.map(async tag => {
                    const isTag = await this.tagRepository.findOne({
                        where: { text: tag },
                    });

                    if (isTag) {
                        newTweet.tags.push(isTag);
                    } else {
                        const newTag = this.tagRepository.create({
                            text: tag,
                        });
                        await newTag.save();

                        newTweet.tags.push(newTag);
                    }
                }),
            );
        }

        await newTweet.save();

        return newTweet;
    }

    async deleteTweet(id: string) {
        const tweetToDelete = await this.tweetRepository.findOne({
            where: { id },
        });

        if (!tweetToDelete) {
            throw new BadRequestException({ message: 'Cannot find a tweet' });
        }

        await tweetToDelete.remove();

        return { message: 'Tweet deleted successfully' };
    }

    async retweet(userId: string, tweetId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['retweets'],
        });

        if (!user) {
            throw new BadRequestException({ message: 'Cannot find the user' });
        }

        const tweet = await this.tweetRepository.findOne({
            where: { id: tweetId },
            relations: ['user'],
        });

        if (!tweet) {
            throw new BadRequestException({
                message: 'Cannot indentify tweet',
            });
        }

        user.retweets.push(tweet);

        await user.save();

        return user.retweets;
    }

    async undoRetweet(userId: string, tweetId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['retweets'],
        });

        if (!user) {
            throw new BadRequestException({ message: 'Cannot find the user' });
        }

        const tweet = await this.tweetRepository.findOne({
            where: { id: tweetId },
        });

        if (!tweet) {
            throw new BadRequestException({
                message: 'Cannot indentify tweet',
            });
        }

        user.retweets = user.retweets.filter(
            retweet => retweet.id !== tweet.id,
        );

        await user.save();

        return user.retweets;
    }

    sortingFunction(Date_A: Tweet, Date_B: Tweet) {
        if (moment(Date_A.issuedAt).isBefore(Date_B.issuedAt)) {
            return 1;
        }
        if (moment(Date_A.issuedAt).isAfter(Date_B.issuedAt)) {
            return -1;
        }
        return 0;
    }
}
