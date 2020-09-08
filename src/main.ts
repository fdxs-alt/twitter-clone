import 'reflect-metadata';
import 'dotenv/config';
declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 6000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true });
    app.use(cookieParser());
    await app.listen(PORT);

    Logger.log(`Server running on port ${process.env.PORT}`, 'bootstrap');
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
