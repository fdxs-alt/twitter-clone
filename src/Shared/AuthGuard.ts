import { verify } from 'jsonwebtoken';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return false;
        }

        const AuthorizationHeader = request.headers.authorization.split(' ');

        if (AuthorizationHeader[0] !== 'Bearer') {
            throw new UnauthorizedException({ message: 'User unauthorized' });
        }

        const decoded = this.validateToken(AuthorizationHeader[1]);

        request.user = decoded;

        return true;
    }

    validateToken(token: string) {
        try {
            const decoded = verify(token, process.env.ACCESS);
            return decoded;
        } catch (error) {
            throw new UnauthorizedException({ message: 'User unauthorized' });
        }
    }
}
