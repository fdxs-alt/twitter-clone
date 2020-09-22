import { Tag } from './Shared/Entities/Tag.entity';
import { TweetModule } from './Tweet/Tweet.module';
import { Tweet } from './Shared/Entities/Tweet.entity';
import { TweetImage } from './Shared/Entities/TweetImage.entity';
import { Background } from './Shared/Entities/Background.entity';
import { Avatar } from './Shared/Entities/Avatar.entity';
import { UserModule } from './User/User.module';
import { User } from './Shared/Entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: parseInt(process.env.dbPort),
            username: process.env.user,
            password: process.env.password,
            database: process.env.database,
            logging: false,
            synchronize: true,
            entities: [User, Avatar, Background, TweetImage, Tweet, Tag],
            keepConnectionAlive: true,
        }),
        UserModule,
        TweetModule,
    ],
})
export class AppModule {}
