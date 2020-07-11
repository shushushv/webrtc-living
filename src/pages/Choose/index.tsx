import React from 'react';
import { useHistory } from 'react-router-dom';

function Choose () {
  let history = useHistory();

  return <div>
    <button onClick={() => history.push('/streamer')}>开直播</button>
    <button onClick={() => history.push('/home')}>看直播</button>
  </div>;
}

export default Choose;