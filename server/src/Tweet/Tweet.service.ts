import { Tag } from '../Shared/Entities/Tag.entity';
import { TweetInput, TweetTable } from './Tweet.dto';
import { Tweet } from '../Shared/Entities/Tweet.entity';
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
            where: { user: { id }, mainTweet: null },
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
            comments: [],
        });

        if (files) {
            newTweet.images = await this.fileService.addImagesToTweet(files);
        }

        if (data.tags.length !== 0) {
            await this.createTags(newTweet, data.tags);
        }

        await newTweet.save();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {tweets, ...rest} = user;
        return {user: rest, tweet: newTweet};
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

    async comment(
        tweetId: string,
        data: TweetInput,
        userId: string,
        files?: Express.Multer.File[],
    ) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException({ message: 'Cannot identify user' });
        }

        const parentTweet = await this.tweetRepository.findOne({
            where: { id: tweetId },
        });

        const newTweet = this.tweetRepository.create({
            gif: data.gif,
            message: data.message,
            user,
            tags: [],
            mainTweet: parentTweet,
        });

        if (files) {
            newTweet.images = await this.fileService.addImagesToTweet(files);
        }

        if (data.tags.length !== 0) {
            await this.createTags(newTweet, data.tags);
        }

        await newTweet.save();

        return newTweet;
    }

    async getAllComments(postId: string) {
        const tweet = await this.tweetRepository.findOne({
            where: { id: postId },
        });

        if (!tweet) {
            throw new BadRequestException({ message: 'Cannot find post ' });
        }

        const allComents = await this.tweetRepository.find({
            mainTweet: tweet,
        });

        return allComents;
    }

    async deleteComment(postId: string, postToDeleteId: string) {
        const tweet = await this.tweetRepository.findOne({
            where: { id: postId },
        });

        if (!tweet) {
            throw new BadRequestException({ message: 'Cannot find post ' });
        }

        const tweetToDelete = await this.tweetRepository.findOne({
            id: postToDeleteId,
            mainTweet: tweet,
        });

        if (!tweetToDelete) {
            throw new BadRequestException({
                message: 'Cannot find post to delete',
            });
        }

        return await tweetToDelete.remove();
    }

    async createTags(newTweet: Tweet, tags: string[]) {
        await Promise.all(
            tags.map(async tag => {
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
    async likeOrUnlikeTweet(userId: string, postId: string) {
        const tweetToLike = await this.tweetRepository.findOne({
            where: { id: postId },
        });

        return await this.likeOrUnlike(tweetToLike, userId);
    }

    isAlreadyLiked(userId: string, tweetToLike: Tweet) {
        return tweetToLike.likes.includes(userId);
    }

    async likeOrUnlike(tweetToLike: Tweet, userId: string) {
        if (!tweetToLike) {
            throw new BadRequestException({ message: 'Cannot find tweet' });
        }

        if (this.isAlreadyLiked(userId, tweetToLike)) {
            tweetToLike.likes = tweetToLike.likes.filter(
                like => like !== userId,
            );
        } else {
            tweetToLike.likes.push(userId);
        }

        await tweetToLike.save();

        return tweetToLike.likes;
    }

    async getAllTweets(userId: string) {
        const following = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['following', 'tweets'],
        });
        const { tweets, ...rest } = following;
        const postsTable: {
            user: typeof rest;
            tweet: Tweet;
        }[] = [];

        tweets.forEach(tweet => {
            if (!tweet.mainTweet) postsTable.push({ user: rest, tweet });
        });

        await Promise.all(
            following.following.map(async user => {
                const posts = await this.tweetRepository.find({
                    where: { user },
                    relations: ['mainTweet'],
                });

                posts.map(post => {
                    if (post.mainTweet === null) {
                        postsTable.push({ tweet: post, user });
                    }
                });
            }),
        );
        return postsTable.sort(this.sortPostTableFunction);
    }

    sortPostTableFunction(Date_A: TweetTable, Date_B: TweetTable) {
        if (moment(Date_A.tweet.issuedAt).isBefore(Date_B.tweet.issuedAt)) {
            return 1;
        }
        if (moment(Date_A.tweet.issuedAt).isAfter(Date_B.tweet.issuedAt)) {
            return -1;
        }
        return 0;
    }
}
