import { Avatar } from './Avatar.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Background } from 'src/FileUpload/Background.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Avatar)
        private avatarRepository: Repository<Avatar>,

        @InjectRepository(Background)
        private backgroundRepository: Repository<Background>,
    ) {}

    async addAvatarOrBackground(data: Buffer, isAvatar: boolean) {
        const s3 = new S3();

        const upload = await s3
            .upload({
                Bucket: process.env.BUCKET_NAME,
                Body: data,
                Key: uuid(),
                ACL: 'public-read',
            })
            .promise();

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
}
