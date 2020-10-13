import { MessageImages } from './../Shared/Entities/MessageImage.entity';
import { TweetImage } from './../Shared/Entities/TweetImage.entity';
import { Avatar } from '../Shared/Entities/Avatar.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Background } from '../Shared/Entities/Background.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Avatar)
        private avatarRepository: Repository<Avatar>,

        @InjectRepository(Background)
        private backgroundRepository: Repository<Background>,

        @InjectRepository(TweetImage)
        private tweetImageRepository: Repository<TweetImage>,

        @InjectRepository(MessageImages)
        private messageImagesRepository: Repository<MessageImages>,
    ) {}

    async addImagesToTweet(files: Express.Multer.File[]) {
        const s3 = new S3();

        const sendImages = files.map(async file => {
            const upload = await this.uploadFile(file.buffer, s3);

            const image = this.tweetImageRepository.create({
                key: upload.Key,
                url: upload.Location,
            });

            return await image.save();
        });

        return await Promise.all(sendImages);
    }
    async addAvatarOrBackground(data: Buffer, isAvatar: boolean) {
        const s3 = new S3();

        const upload = await this.uploadFile(data, s3);

        if (isAvatar) {
            const avatar = this.avatarRepository.create({
                key: upload.Key,
                url: upload.Location,
            });

            await avatar.save();

            return avatar;
        }

        const background = this.backgroundRepository.create({
            key: upload.Key,
            url: upload.Location,
        });

        await background.save();

        return background;
    }

    async uploadFile(data: Buffer, s3: S3) {
        return await s3
            .upload({
                Bucket: process.env.BUCKET_NAME,
                Body: data,
                Key: uuid(),
                ACL: 'public-read',
            })
            .promise();
    }

    async addImagesToMessage(files: [{ buffer: Buffer; name: string }]) {
        const s3 = new S3();

        const sendImages = files.map(async file => {
            const upload = await this.uploadFile(file.buffer, s3);

            const image = this.messageImagesRepository.create({
                key: upload.Key,
                url: upload.Location,
            });

            return await image.save();
        });

        return await Promise.all(sendImages);
    }
}
