import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { createUserInput, loginInput } from './User.dto';
import { sign, verify } from 'jsonwebtoken';
import { Response, Request } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllUsers() {
        return await (await this.userRepository.find()).map(user =>
            user.toOtherUsersResponse(),
        );
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
            user: userWithCode.selfResponse(),
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

        return {
            user: user.selfResponse(),
            accessToken: this.createAccessToken(user.id),
        };
    }

    async revokeToken(req: Request, res: Response) {
        const refreshToken = req.cookies.jrc;

        if (!refreshToken) {
            return { ok: false, accessToken: '' };
        }

        let decoded = null;

        try {
            decoded = verify(refreshToken, process.env.REFRESH);
        } catch (error) {
            return { ok: false, accessToken: '' };
        }
        const user = await this.userRepository.findOne({ id: decoded.id });

        if (!user) {
            return { ok: false, accessToken: '' };
        }

        res.cookie('jrc', this.createRefreshToken(user.id), {
            httpOnly: true,
        });

        return {
            ok: true,
            accessToken: this.createAccessToken(user.id),
        };
    }

    createAccessToken(id: string) {
        return (
            'Bearer ' + sign({ id }, process.env.ACCESS, { expiresIn: '60m' })
        );
    }

    createRefreshToken(id: string) {
        return sign({ id }, process.env.REFRESH, { expiresIn: '7d' });
    }
}
