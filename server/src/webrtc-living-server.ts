import WebSocket, { Server } from "ws";
import Connection from "./connection";
import log from "./utils/logger";

class WebRTCLivingServer {
  private connectionList: Connection[] = [];

  public listen (port: number) {
    let server = new Server({ port });

    server.on('connection', socket => {
      log('new connect...');
      this._connect(socket);
      log('size of connectors: ' + this.connectionList.length);
    });
  }

  private _connect (socket: WebSocket) {
    let conn = new Connection(socket);
    this.connectionList.push(conn);

    socket.on('message', (evt: string) => conn.handleMsg(evt));
    socket.on('close', () => {
      conn.destroy();
      this.connectionList = this.connectionList.filter(v => v !== conn);
    });
  }
}

export default WebRTCLivingServer;