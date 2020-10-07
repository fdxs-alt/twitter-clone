import { ValidationPipe } from './../Shared/ValidationPipe';
import { Response, Request } from 'express';
import {
    createUserInput,
    loginInput,
    VerifyAccountInput,
    UpdateProfileInput,
} from './User.dto';
import { UserService } from './User.service';
import {
    Controller,
    Body,
    Post,
    Res,
    Req,
    UseGuards,
    Get,
    UseInterceptors,
    UploadedFiles,
    Patch,
    Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../Shared/AuthGuard';
import { User } from './User.decorator';
@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post('register')
    register(@Body(new ValidationPipe()) data: createUserInput) {
        return this.userService.register(data);
    }

    @Post('login')
    async login(
        @Body(new ValidationPipe()) data: loginInput,
        @Res() res: Response,
    ) {
        return res.json(await this.userService.login(data, res));
    }

    @Post('verify')
    async verify(
        @Body(new ValidationPipe()) data: VerifyAccountInput,
        @Res() res: Response,
    ) {
        return res.json(
            await this.userService.verifyUser(data.email, data.code, res),
        );
    }

    @Post('revoke')
    async revoke(@Req() req: Request, @Res() res: Response) {
        return res.json(await this.userService.revokeToken(req, res));
    }

    @Patch('updateProfile')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'avatar', maxCount: 1 },
            { name: 'background', maxCount: 1 },
        ]),
    )
    uploadFile(
        @User('id') id: string,
        @UploadedFiles() files?,
        @Body() data?: UpdateProfileInput,
    ) {
        return this.userService.updateProfile(
            id,
            data,
            files?.avatar,
            files?.background,
        );
    }

    @Post('follow/:userId')
    @UseGuards(AuthGuard)
    follow(@User('id') id: string, @Param('userId') userId: string) {
        return this.userService.followUser(userId, id);
    }

    @Get('logout')
    @UseGuards(AuthGuard)
    logout(@Res() res: Response) {
        res.clearCookie('jrc');
        return res.status(200).json({ message: 'Logged out succesfully' });
    }

    @Get('follow/:skip')
    @UseGuards(AuthGuard)
    getMyTweets(@Param('skip') skip: number, @User('id') id: string) {
        return this.userService.getUsersToFollow(id, skip);
    }

    @Get('user/:id')
    @UseGuards(AuthGuard)
    getSpecificUser(@Param('id') id: string) {
        return this.userService.getSpecifcUser(id);
    }
}
