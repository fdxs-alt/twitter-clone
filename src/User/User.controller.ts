import { Response } from 'express';
import { createUserInput, loginInput } from './User.dto';
import { UserService } from './User.service';
import { Controller, Body, Post, Res } from '@nestjs/common';
@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    register(@Body() data: createUserInput) {
        return this.userService.register(data);
    }

    @Post('login')
    async login(@Body() data: loginInput, @Res() res: Response) {
        return res.json(await this.userService.login(data, res));
    }

    @Post('verify')
    async verify(
        @Body() data: { email: string; code: number },
        @Res() res: Response,
    ) {
        return res.json(
            await this.userService.verifyUser(data.email, data.code, res),
        );
    }
}
