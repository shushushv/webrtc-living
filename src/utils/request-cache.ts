interface ISubs {
  [seq: string]: ISubscriber
}

interface ISubscriber {
  onOk?: (data: any) => void;               // 订阅成功回调
  onError?: (data: any) => void;            // 订阅失败回调
}

let seq = 0;                                // 序列号
let subs: ISubs = {};                       // 订阅者集合

function get (id: string) {
  const sub = subs[id];
  if (sub) {
    delete subs[id];
    return sub;
  }
}

function set (params: ISubscriber) {
  const id = (++seq).toString();
  Reflect.set(subs, id, params);

  return id;
}

function has (id: string) {
  return Reflect.has(subs, id);
}

export default {
  get,
  set,
  has
};