import { socket } from "../config/socket-connection";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket } from "socket.io-client";

import { EVENTS } from "../config/constants";

interface ISocketContext {
  socket: Socket;
  messages?: { message: string; time: string; username: string }[];
  rooms?: any;
  openedRoomId?: string;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  messages: [],
  rooms: [],
  openedRoomId: null,
});

function SocketsProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [openedRoomId, setOpenedRoomId] = useState();

  socket.on(EVENTS.SERVER.CHANNELS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_CHANNEL, ({ roomId }) => {
    setOpenedRoomId(roomId);
  });

  useEffect(() => {
    console.log(socket);
    const messagesListener = ({ message, username, time }) => {
      setMessages((messages) => [...messages, { message, username, time }]);
    };
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, messagesListener);
    return () => {
      socket.off(EVENTS.SERVER.ROOM_MESSAGE, messagesListener);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        rooms,
        openedRoomId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
