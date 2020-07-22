import WebSocket from "ws";
import { REQYEST_TYPE } from './../../src/config/request-type';
import { getGUID, removeGUID } from "./utils/guid";

interface IBasic {
  seq: string;
  type: string;
}

interface IRoom extends IBasic {
  name: string;
  title: string;
}

class Connection {
  public isHost = false;            // 是否为主播

  public name?: string;

  public title?: string;

  public roomId?: number;

  constructor (public socket: WebSocket) {}

  public handleMsg (e: string) {
    const data = JSON.parse(e);
    
    if (data) {
      switch (data.type) {
        case REQYEST_TYPE.CREATE_ROOM:
          this._createRoom(data);
          break;
      }
    }
  }

  public destroy () {
    if (this.isHost && this.roomId) {
      removeGUID(this.roomId)
    }
  }

  private _createRoom ({
    seq,
    name,
    title
  }: IRoom) {
    this.isHost = true;
    this.title = title;
    this.name = name;
    this.roomId = getGUID();

    this.socket.send(JSON.stringify({
      error: 0,
      roomId: this.roomId,
      seq
    }));
  }
}

export default Connection;