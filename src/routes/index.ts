import Choose from "../pages/Choose";
import Room from "../pages/Room";
import Streamer from "../pages/Streamer";
import Home from "../pages/Home";

export default [
  {
    key: 'room',
    path: '/room/:roomId',
    component: Room,
    authenticate: true
  },
  {
    key: 'choose',
    path: '/choose',
    component: Choose,
    authenticate: false
  },
  {
    key: 'streamer',
    path: '/streamer',
    component: Streamer,
    authenticate: true
  },
  {
    key: 'home',
    path: '/home',
    component: Home,
    authenticate: true
  }
]