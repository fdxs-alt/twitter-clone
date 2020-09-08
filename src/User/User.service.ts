import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { createUserInput, loginInput } from './User.dto';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async register(data: createUserInput) {
        const isUserAlreadyInDatabase = await this.userRepository.findOne({
            where: [
                { email: data.email },
                { phone: data.phone },
                { userName: data.username },
            ],
        });

        if (isUserAlreadyInDatabase)
            throw new BadRequestException({
                message: 'User already exists',
            });

        const newUser = this.userRepository.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            password: data.password,
            userName: data.username,
        });

        await newUser.save();

        return true;
    }

    async verifyUser(email: string, code: number, res: Response) {
        const userWithCode = await this.userRepository.findOne({
            where: { email },
        });

        if (!userWithCode) {
            throw new BadRequestException({
                message: 'Cannot find given user',
            });
        }

        if (userWithCode.confirmed) {
            throw new BadRequestException({
                message: 'Email has already been confirmed',
            });
        }

        const isVerified = await userWithCode.verifyUser(code);

        if (!isVerified) {
            throw new UnauthorizedException({
                message: 'Given code is incorrect',
            });
        }

        res.cookie('jrc', this.createRefreshToken(userWithCode.id), {
            httpOnly: true,
        });

        return {
            user: userWithCode,
            accessToken: this.createAccessToken(userWithCode.id),
        };
    }

    async login(data: loginInput, res: Response) {
        const user = await this.userRepository.findOne({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException({
                message: 'Email or password is wrong',
            });
        }

        if (!user.confirmed) {
            throw new UnauthorizedException({
                message: 'To log in, email confirmation is required',
            });
        }

        const canLogIn = user.comparePasswords(data.password);

        if (!canLogIn) {
            throw new UnauthorizedException({
                message: 'Email or password is wrong',
            });
        }
        res.cookie('jrc', this.createRefreshToken(user.id), {
            httpOnly: true,
        });
        return { user, accessToken: this.createAccessToken(user.id) };
    }

    createAccessToken(id: string) {
        return sign({ id }, process.env.ACCESS, { expiresIn: '60m' });
    }

    createRefreshToken(id: string) {
        return sign({ id }, process.env.REFRESH, { expiresIn: '7d' });
    }
}
