export const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:8080";

export const EVENTS = {
  CLIENT: {
    SEND_MESSAGE: "send_message",
    CREATE_CHANNEL: "create_channel",
    JOIN_CHANNEL: "join_channel",
  },
  SERVER: {
    CHANNELS: "get_channels",
    JOINED_CHANNEL: "joined_channel",
    ROOM_MESSAGE: "add_room_message",
  },
};
