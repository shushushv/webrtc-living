import WebSocket from "ws";

class Connection {
  constructor (public socket: WebSocket) {}

  public handleMsg (data: WebSocket.Data) {
    console.log(data);
    // todo
  }

  public destroy () {
    // todo
  }
}

export default Connection;