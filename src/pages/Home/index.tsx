import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, IRoom } from '../../apis/socket';

function Home () {
  const api = useContext(ApiContext);
  const [roomList, setRoomList] = useState<IRoom[]>([]);

  useEffect(() => {
    api.getRoomList().then(res => {
      console.log('getRoomList', res);
      setRoomList(res);
    });
  }, [api]);

  const roomListRender = () => (
    roomList.map(room => (
      <div>{room.title}</div>
    ))
  );

  return <div>
    Home: room-list
    {
      roomListRender()
    }
  </div>;
}

export default Home;