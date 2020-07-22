export type IUserInfo = IStreamerInfo | IAudienceInfo;

export interface IStreamerInfo {
  name: string;
  title: string;
  roomId: string;
}

export interface IAudienceInfo {
  name: string;
}

const KEY = 'WEBRTC_LIVING_INFO';

export function isLogin (): boolean {
  return !!localStorage.getItem(KEY);
}

export function getUserInfo (): IUserInfo | undefined {
  let target = localStorage.getItem(KEY);
  if (target) {
    return JSON.parse(target);
  }
}

export function updateUserInfo (params: IUserInfo) {
  localStorage.setItem(KEY, JSON.stringify(params));
}

export function deleteUserInfo () {
  localStorage.removeItem(KEY);
}

export function isStreamer (info: IUserInfo): info is IStreamerInfo {
  return Reflect.has(info, 'roomId');
}