import React, { useState, useRef, useEffect } from 'react';
import { getUserMedia, getDisplayMedia } from '../../utils/webrtc';
import streamMixer from '../../utils/streams-mixer';
import { getUserInfo, isStreamer } from '../../apis/login';
import { useHistory } from 'react-router-dom';

const Streamer: React.FC = () => {
  const [stream, setStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const history = useHistory();

  const roomInfo: any = getUserInfo();
  if (!roomInfo || !isStreamer(roomInfo)) {
    history.push('/choose');
  }

  let startLive = () => {
    const options = {
      video: true,
      audio: true
    };
    
    Promise.all([getDisplayMedia(), getUserMedia(options)])
      .then(streams => {
        const mediaStream = streamMixer(streams);
        setStream(mediaStream);
      });
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <div>
    <button onClick={startLive}>开始直播</button>
    <br />
    <span>{roomInfo.title}</span>
    <span>{roomInfo.name}</span>
    <video width="50%" autoPlay muted ref={videoRef}></video>
  </div>;
}

export default Streamer;