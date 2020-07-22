import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { updateUserInfo, getUserInfo, isStreamer } from '../../apis/login';
import { ApiContext } from '../../apis/socket';

function Choose () {
  const history = useHistory();
  const api = useContext(ApiContext);

  const userInfo = getUserInfo();
  if (userInfo) {
    history.push(isStreamer(userInfo) ? '/streamer' : '/home');
  }

  const startLive = () => {
    const info = {
      name: 'xx主播',
      title: 'xx主播的直播房间'
    };
    api.createRoome(info).then(({ roomId }) => {
      updateUserInfo(Object.assign({ roomId }, info));
      history.push('/streamer');
    }).catch(() => console.error('createRoome error'));
  };

  const watchLive = () => {
    const info = {
      name: 'xx观众'
    };
    updateUserInfo(info);
    history.push('/home')
  };

  return <div>
    <button onClick={startLive}>开直播</button>
    <button onClick={watchLive}>看直播</button>
  </div>;
}

export default Choose;