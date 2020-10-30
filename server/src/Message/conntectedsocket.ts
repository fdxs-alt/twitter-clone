import * as SocketIO from 'socket.io';

export interface ConnSocket extends SocketIO.Socket {
    conn: SocketIO.EngineSocket & {
        decoded: {
            iat: number;
            exp: number;
            id: string;
        };
    };
}
