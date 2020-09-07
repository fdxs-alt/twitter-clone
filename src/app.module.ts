import { User } from './User/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'wojownik1234',
            database: 'twitter-clone',
            logging: true,
            synchronize: true,
            dropSchema: true,
            entities: [User],
            keepConnectionAlive: true,
        }),
    ],
})
export class AppModule {}
