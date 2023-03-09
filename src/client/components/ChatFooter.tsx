import React, { ActionIcon, Group, TextInput } from "@mantine/core";
import { EVENTS } from "../config/constants";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useSockets } from "../contexts/SocketContext";

export default function ChatFooter() {
  const { socket } = useSockets();
  const [message, setMessage] = useState<string>("");

  const onSubmitMessage = (value: string) => {
    if (!value.trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {
      message: value,
      username: socket.id,
    });
    setMessage("");
  };

  return (
    <Group>
      <TextInput
        label="message"
        value={message}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
      />
      <ActionIcon onClick={() => onSubmitMessage(message)}>Send</ActionIcon>
    </Group>
  );
}
