import { Background } from './FileUpload/Background.entity';
import { Avatar } from './FileUpload/Avatar.entity';
import { UserModule } from './User/User.module';
import { User } from './User/User.entity';
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
            logging: true,
            synchronize: true,
            entities: [User, Avatar, Background],
            keepConnectionAlive: true,
        }),
        UserModule,
    ],
})
export class AppModule {}
