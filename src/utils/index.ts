const KEY = 'WEBRTC_LIVING_INFO';

export function isLogin (): boolean {
  return !!localStorage.getItem(KEY);
}