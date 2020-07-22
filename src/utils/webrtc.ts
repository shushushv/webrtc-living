declare global {
  interface Window {
    mozRTCPeerConnection: {
      new (configuration: RTCConfiguration): webkitRTCPeerConnection;
      prototype: webkitRTCPeerConnection;
    };
    mozRTCSessionDescription: {
      new (descriptionInitDict: RTCSessionDescriptionInit): RTCSessionDescription;
      prototype: RTCSessionDescription;
    };
  }
  interface Navigator {
    webkitGetUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
    mozGetUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

/* WebRTC 兼容性 */
export const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

export const NativeRTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;

/* 获取摄像头/麦克风 */
export const getUserMedia = (constrains: MediaStreamConstraints): Promise<MediaStream> => {
  if(navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constrains);
  } else if (navigator.webkitGetUserMedia) {
    return navigator.webkitGetUserMedia(constrains);
  } else if (navigator.mozGetUserMedia) {
    return navigator.mozGetUserMedia(constrains);
  } else if (navigator.getUserMedia) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(constrains, s => resolve(s), e => reject(e));
    });
  }
  return Promise.reject();
};

/* 屏幕共享 */
export const getDisplayMedia = (): Promise<MediaStream> => {
  if (Reflect.has(navigator.mediaDevices, 'getDisplayMedia')) {
    return (navigator.mediaDevices as any).getDisplayMedia();
  }
  return Promise.reject();
}