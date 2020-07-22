import RequsetCache from './request-cache'; 

class Socket <req, rsp> {
  private _ws: WebSocket;

  private _ready = false;

  private _signalCache: string[] = [];

  constructor (url: string) {
    this._ws = new WebSocket(url);

    this._ws.onopen = this._handleOpen.bind(this);
    this._ws.onmessage = this._handleMsg.bind(this);
  }

  public send (options: req): Promise<rsp> {
    return new Promise((resolve, reject) => {
      let data = {
        seq: RequsetCache.set({
          onOk: e => resolve(e),
          onError: e => reject(e)
        }),
        ...options
      };
  
      if (this._ready) {
        this._ws.send(JSON.stringify(data));
      } else {
        this._signalCache.push(JSON.stringify(data));
      }
    });
  }

  private _handleOpen () {
    this._ready = true;
    this._signalCache.forEach(msg => this._ws.send(msg));
  }

  private _handleMsg (evt: MessageEvent) {
    let { seq, error, ...data  } = JSON.parse(evt.data);
    if (seq) {
      let sub = RequsetCache.get(seq);
      if (error === 0) {
        sub?.onOk && sub.onOk(data);
      } else {
        sub?.onError && sub.onError(data);
      }
    }
  }
}

export default Socket;