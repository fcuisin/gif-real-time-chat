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
  setMessages: Function; // TODO: Add a better type
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  messages: [],
  setMessages: () => false,
});

function SocketsProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
