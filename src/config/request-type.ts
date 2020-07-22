export enum REQYEST_TYPE {
  // 创建房间（主播）
  CREATE_ROOM = 'create_room',
  // 房间重连（主播）
  RECONNECT_ROOM = 'reconnect_room',
  // 关闭房间（主播）
  CLOSE_ROOM = 'close_room',
  // 获取房间列表（观众）
  ROOM_LIST = 'room_list',
  // 加入房间（观众）
  JOIN_ROOM = 'join_room',

  // webrtc 相关信令
  WEBRTC_OFFER = 'webrtc_offer',
  WEBRTC_ANSWER = 'webrtc_answer',
  WEBRTC_ICE = 'webrtc_ice',
}