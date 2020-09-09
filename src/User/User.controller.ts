import { ValidationPipe } from './../Shared/ValidationPipe';
import { Response, Request } from 'express';
import { createUserInput, loginInput, VerifyAccountInput } from './User.dto';
import { UserService } from './User.service';
import {
    Controller,
    Body,
    Post,
    Res,
    Req,
    UseGuards,
    Get,
} from '@nestjs/common';

import { AuthGuard } from 'src/Shared/AuthGuard';
@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    @UseGuards(AuthGuard)
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
}
