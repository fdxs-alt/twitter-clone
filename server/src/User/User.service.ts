import { FileService } from './../FileUpload/FileUpload.service';
import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Shared/Entities/User.entity';
import { Repository, MoreThanOrEqual, Like } from 'typeorm';
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
            followers: followers ? followers.map(follower => follower.id) : [],
            following: following ? following.map(follower => follower.id) : [],
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
            followers: followers ? followers.map(follower => follower.id) : [],
            following: following ? following.map(follower => follower.id) : [],
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
        const user = await this.userRepository.findOne({
            where: { id: decoded.id },
            relations: ['following', 'followers'],
        });

        if (!user) {
            return { user: null, accessToken: '' };
        }

        res.cookie('jrc', this.createRefreshToken(user.id), {
            httpOnly: true,
        });

        const { followers, following, ...rest } = user;

        const userData = {
            ...rest,
            followingCount: !!following.length ? following.length : 0,
            followersCount: !!followers.length ? followers.length : 0,
            followers: followers ? followers.map(follower => follower.id) : [],
            following: following ? following.map(follower => follower.id) : [],
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
            relations: ['followers', 'following'],
        });

        if (!loggedUser) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        if (user.followers.some(u => u.id === loggedUser.id)) {
            user.followers = user.followers.filter(user => {
                return user.id !== loggedUser.id;
            });
            await user.save();
            return null;
        } else {
            user.followers.push(loggedUser);
            await user.save();
            return user.id;
        }
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
            .filter(
                user => !user.followers.some(u => u.id === userOfAccount.id),
            );
    }

    async getSpecifcUser(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['tweets', 'following', 'followers'],
        });

        if (!user) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        const { following, followers, tweets, ...rest } = user;

        return {
            ...rest,
            tweets,
            followingCount: following.length,
            followersCount: followers.length,
        };
    }
    async getFollowing(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['following'],
        });

        if (!user) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        return user.following;
    }

    async getFollowers(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['followers'],
        });

        if (!user) {
            throw new BadRequestException({ message: "User doesn't exist" });
        }

        return user.followers;
    }

    async searchForUser(criterium: string) {
        const user = await this.userRepository.find({
            where: [
                { userName: Like('%' + criterium + '%') },
                { fullName: Like('%' + criterium + '%') },
            ],
        });

        if (!user) return { user: null };
        return user;
    }
}
