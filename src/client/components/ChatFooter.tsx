import React, { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { EVENTS } from "../config/constants";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useSockets } from "../contexts/SocketContext";

export default function ChatFooter() {
  const { socket, openedRoomId } = useSockets();
  const [message, setMessage] = useState<string>("");

  const onSubmitMessage = (value: string) => {
    if (!value.trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {
      roomId: openedRoomId,
      message: value,
      username: socket.id,
    });
    setMessage("");
  };

  return (
    <Group align="center" mt="xl">
      <TextInput
        value={message}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
      />
      <Button variant="default" onClick={() => onSubmitMessage(message)}>
        Send
      </Button>
    </Group>
  );
}
