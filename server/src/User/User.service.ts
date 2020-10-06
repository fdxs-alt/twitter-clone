import { FileService } from './../FileUpload/FileUpload.service';
import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Shared/Entities/User.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { createUserInput, loginInput, UpdateProfileInput } from './User.dto';
import { sign, verify } from 'jsonwebtoken';
import { Response, Request } from 'express';
import moment from 'moment';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly fileService: FileService,
    ) {}

    async getAllUsers() {
        return await this.userRepository.find({
            relations: ['followers', 'following'],
        });
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
            relations: ['followers', 'following'],
        });

        const { followers, following, ...rest } = userWithCode;
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

        userWithCode.code = null;

        res.cookie('jrc', this.createRefreshToken(userWithCode.id), {
            httpOnly: true,
        });

        await userWithCode.save();
        const user = {
            ...rest,
            followingCount: following ? following.length : 0,
            followersCount: followers ? followers.length : 0,
        };

        return {
            user,
            accessToken: this.createAccessToken(userWithCode.id),
        };
    }

    async login(data: loginInput, res: Response) {
        const user = await this.userRepository.findOne({
            where: { email: data.email },
            relations: ['followers', 'following'],
        });

        if (!user) {
            throw new UnauthorizedException({
                message:
                    'The username and password you entered did not match our records. Please double-check and try again.',
            });
        }

        const canLogIn = await user.comparePasswords(data.password);

        if (!canLogIn) {
            throw new UnauthorizedException({
                message:
                    'The username and password you entered did not match our records. Please double-check and try again.',
            });
        }

        if (!user.confirmed) {
            throw new UnauthorizedException({
                message: 'To log in, email confirmation is required',
            });
        }

        const { followers, following, ...rest } = user;
        const userData = {
            ...rest,
            followingCount: following ? following.length : 0,
            followersCount: followers ? followers.length : 0,
        };
        res.cookie('jrc', this.createRefreshToken(user.id), {
            httpOnly: true,
        });

        return {
            user: userData,
            accessToken: this.createAccessToken(user.id),
        };
    }

    async revokeToken(req: Request, res: Response) {
        const refreshToken = req.cookies.jrc;

        if (!refreshToken) {
            return { user: null, accessToken: '' };
        }

        let decoded = null;

        try {
            decoded = verify(refreshToken, process.env.REFRESH);
        } catch (error) {
            return { user: null, accessToken: '' };
        }
        const user = await this.userRepository.findOne({ id: decoded.id });

        if (!user) {
            return { user: null, accessToken: '' };
        }

        res.cookie('jrc', this.createRefreshToken(user.id), {
            httpOnly: true,
        });

        const { followers, following, ...rest } = user;
        const userData = {
            ...rest,
            followingCount: following ? following.length : 0,
            followersCount: followers ? followers.length : 0,
        };

        return {
            user: userData,
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

    async updateProfile(
        id: string,
        data: UpdateProfileInput,
        avatar?: any,
        background?: any,
    ) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException({ message: 'User does not exist' });
        }

        if (data.city) {
            user.city = data.city;
        }

        if (data.profileLink) {
            user.profileLink = data.profileLink;
        }

        if (data.country) {
            user.country = data.country;
        }

        if (data.description) {
            user.description = data.description;
        }

        if (background) {
            const userbackground = await this.fileService.addAvatarOrBackground(
                background[0].buffer,
                false,
            );

            user.background = userbackground;
        }

        if (avatar) {
            const useravatar = await this.fileService.addAvatarOrBackground(
                avatar[0].buffer,
                true,
            );

            user.avatar = useravatar;
        }

        await user.save();

        return user;
    }

    async followUser(userId: string, loggedId: string) {
        if (userId === loggedId) {
            throw new BadRequestException({
                message: "You can't follow yourself",
            });
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['followers', 'following'],
        });

        if (!user) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        const loggedUser = await this.userRepository.findOne({
            where: {
                id: loggedId,
            },
        });

        if (!loggedUser) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        if (user.followers.includes(loggedUser)) {
            user.followers = user.followers.filter(user => {
                return user.id !== loggedUser.id;
            });
        } else {
            user.followers.push(loggedUser);
        }

        await user.save();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { followers, following, ...rest } = user;
        
        return rest;
    }

    async getUsersToFollow(id: string, numberToSkip: number) {
        const userOfAccount = await this.userRepository.findOne({
            where: { id },
            relations: ['following'],
        });

        const usersToFollow = await this.userRepository.find({
            take: 5,
            skip: numberToSkip,
            relations: ['followers'],
            where: { created: MoreThanOrEqual(moment().subtract(10, 'days')) },
        });

        return usersToFollow
            .filter(user => user.id !== userOfAccount.id)
            .filter(user => !user.followers.includes(userOfAccount));
    }
}
