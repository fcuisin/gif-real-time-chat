import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";

export const EVENTS = {
  CONNECTION: "connection",
  CLIENT: {
    //CREATE_ROOM: "CREATE_ROOM",
    SEND_MESSAGE: "SEND_ROOM_MESSAGE",
    //JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    //ROOMS: "ROOMS",
    //JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

function initializeSocket({ io }: { io: Server }) {
  console.log(`Sockets enabled`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`User connected ${socket.id}`);

    /*
     * When a user sends a room message
     */
    socket.on(EVENTS.CLIENT.SEND_MESSAGE, ({ message, username }) => {
      const date = new Date();

      io.emit(EVENTS.SERVER.ROOM_MESSAGE, {
        message,
        username,
        time: `${date.getHours()}:${date.getMinutes()}`,
      });
    });
  });
}

export default initializeSocket;
