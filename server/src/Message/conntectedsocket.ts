import * as SocketIO from 'socket.io';

export interface ConnectedSocket extends SocketIO.Socket {
    conn: SocketIO.EngineSocket & {
        userId: string;
    };
}
