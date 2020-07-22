type PositionList = 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

interface IMixerOptions {
  width?: number;
  height?: number;
  fps?: number;
  ratio?: number;
  position?: PositionList;
}

const defaultOptions = {
  width: 1920,
  height: 1080,
  fps: 60,
  ratio: 0.2,
  position: 'bottom-end'
};

export default function streamMixer (streams: MediaStream[], options: IMixerOptions = {}): MediaStream | undefined {
  const {
    width,
    height,
    fps,
    ratio,
    position
  } = Object.assign({}, defaultOptions, options);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  if (!ctx) {
    return;
  }

  let x: number, y: number;
  switch (position) {
    case 'top-start':
      x = y = 0;
      break;
    case 'top-end':
      x = width * (1 - ratio);
      y = 0;
      break;
    case 'bottom-start':
      x = 0;
      y = height * (1 - ratio);
      break;
    case 'bottom-end':
      x = width * (1 - ratio);
      y = height * (1 - ratio);
      break;
  }

  // 屏幕 & 摄像头
  const [screen, camera] = streams.map(s => getVideo(s));
  setInterval(() => {
    ctx.drawImage(screen, 0, 0, width, height);
    ctx.drawImage(camera, x, y, width * ratio, height * ratio);
  }, fps);

  return (canvas as any).captureStream();
}

function getVideo (stream: MediaStream): HTMLVideoElement {
  const video = document.createElement('video');

  video.autoplay = true;
  video.muted = true;
  video.srcObject = stream;

  video.addEventListener('canplay', () => {
    video.play();
  });

  return video;
}