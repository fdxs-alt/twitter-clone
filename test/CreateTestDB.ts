import 'dotenv/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from '../src/Shared/Entities/Avatar.entity';
import { Background } from '../src/Shared/Entities/Background.entity';
import { Tag } from '../src/Shared/Entities/Tag.entity';
import { Tweet } from '../src/Shared/Entities/Tweet.entity';
import { TweetImage } from '../src/Shared/Entities/TweetImage.entity';
import { User } from '../src/Shared/Entities/User.entity';
import { UserModule } from '../src/User/User.module';
export async function createConn() {
    return await Test.createTestingModule({
        imports: [
            UserModule,
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: process.env.user,
                password: process.env.password,
                database: 'TESTDB',
                synchronize: true,
                dropSchema: true,
                entities: [User, Avatar, Background, TweetImage, Tweet, Tag],
                keepConnectionAlive: true,
            }),
        ],
    }).compile();
}
