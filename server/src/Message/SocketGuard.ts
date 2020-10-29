import { ConnectedSocket } from './conntectedsocket';
import { verify } from 'jsonwebtoken';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient<ConnectedSocket>();
        const query = client.handshake.query.token;

        if (!query) {
            return false;
        }

        const queryToken = query.split(' ');

        if (queryToken[0] !== 'Bearer') {
            throw new WsException({ message: 'User unauthorized' });
        }

        const decoded = this.validateToken(queryToken[1]);

        client.conn.userId = decoded;

        return true;
    }

    validateToken(token: string): string {
        try {
            const decoded = verify(token, process.env.ACCESS);
            return decoded as string;
        } catch (error) {
            throw new WsException({ message: 'User unauthorized' });
        }
    }
}
