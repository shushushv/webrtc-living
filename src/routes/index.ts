import Choose from "../pages/Choose";
import Room from "../pages/Room";
import Streamer from "../pages/Streamer";
import Home from "../pages/Home";

export default [
  {
    key: 'room',
    path: '/room/:roomId',
    component: Room
  },
  {
    key: 'choose',
    path: '/choose',
    component: Choose
  },
  {
    key: 'streamer',
    path: '/streamer',
    component: Streamer
  },
  {
    key: 'home',
    path: '/home',
    component: Home
  }
]