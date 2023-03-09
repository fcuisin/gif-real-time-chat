export const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:8080";

export const EVENTS = {
  CONNECTION: "CONNECTION",
  CLIENT: {
    SEND_MESSAGE: "SEND_ROOM_MESSAGE",
  },
  SERVER: {
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};
