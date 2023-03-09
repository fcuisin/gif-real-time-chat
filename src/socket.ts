import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
import { ObjectId } from "mongodb";

export const EVENTS = {
  CONNECTION: "connection",
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

interface IRoomProps {
  id?: string | ObjectId;
}

const rooms: IRoomProps[] = [];

function initializeSocket({ io }: { io: Server }) {
  console.log(`Sockets enabled`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`User connected ${socket.id}`);

    socket.emit(EVENTS.SERVER.CHANNELS, rooms);

    socket.on(EVENTS.CLIENT.SEND_MESSAGE, ({ roomId, message, username }) => {
      const date = new Date();

      io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        message,
        username,
        time: `${date.getHours()}:${date.getMinutes()}`,
      });

      console.log(` ${socket.id} sent a message to ${roomId}`);
    });

    socket.on(EVENTS.CLIENT.CREATE_CHANNEL, ({ roomName }) => {
      const newRoom = {
        id: uuidv4(),
        name: roomName,
      };
      rooms.push(newRoom);

      socket.join(newRoom.id);

      socket.broadcast.emit(EVENTS.SERVER.CHANNELS, rooms);
      socket.emit(EVENTS.SERVER.CHANNELS, rooms);
    });

    socket.on(EVENTS.CLIENT.JOIN_CHANNEL, ({ roomId }) => {
      console.log(`${socket.id} joined ${roomId}`);
      socket.join(roomId);
      socket.emit(EVENTS.SERVER.JOINED_CHANNEL, { roomId });
    });
  });
}

export default initializeSocket;
