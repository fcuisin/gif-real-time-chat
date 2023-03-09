import { Text } from "@mantine/core";

import { useSockets } from "../contexts/SocketContext";

export default function ChatBody() {
  const { messages } = useSockets();

  return (
    <>
      {messages?.map(({ message, username, time }) => (
        <Text key={message}>
          {message} - {username} - {time}
        </Text>
      ))}
    </>
  );
}
