import { REQYEST_TYPE } from '../config/request-type';
import Socket from "../utils/socket";
import React from 'react';

interface ISocketReq {
  name?: string;                                           // 昵称（主播/观众）
  title?: string;                                          // 房间标记（主播）
  type: REQYEST_TYPE;                              // 请求类型
}

interface ISocketRsp {
  seq: string;
  error: number;
  roomId?: string;
  roomList?: IRoom[];
}

export interface IRoom {
  id: string;
  title: string;
}

const WS_URL = 'ws://localhost:8088';

class API {
  private _socket: Socket<ISocketReq, ISocketRsp>;
  
  constructor (ws: string) {
    this._socket = new Socket(ws);
  }

  public createRoome (params: {
    name: string;
    title: string;
  }) {
    return this._socket.send({
      ...params,
      type: REQYEST_TYPE.CREATE_ROOM
    });
  }

  public closeRoom () {
    return this._socket.send({
      type: REQYEST_TYPE.CLOSE_ROOM
    });
  }

  public getRoomList (): Promise<IRoom[]> {
    return new Promise((resolve, reject) => {
      this._socket.send({
        type: REQYEST_TYPE.ROOM_LIST
      }).then(res => {
        res.roomList
          ? resolve(res.roomList)
          : reject();
      }).catch(reject);;
    });
  }

  public joinRoom () {
    return this._socket.send({
      type: REQYEST_TYPE.JOIN_ROOM
    });
  }

  public sendOffer () {
    return this._socket.send({
      type: REQYEST_TYPE.WEBRTC_OFFER
    });
  }

  public sendAnswer () {
    return this._socket.send({
      type: REQYEST_TYPE.WEBRTC_ANSWER
    });
  }

  public sendIce () {
    return this._socket.send({
      type: REQYEST_TYPE.WEBRTC_ICE
    });
  }
}

export const ApiContext = React.createContext<API>(new API(WS_URL));