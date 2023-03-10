import {
  Anchor,
  Box,
  Button,
  Footer,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { EVENTS } from "../config/constants";

import { useSockets } from "../contexts/SocketContext";

export default function ChatBody() {
  const { messages } = useSockets();

  return (
    <>
      <Stack spacing="xl">
        <Text>Messages</Text>
        {messages?.map(({ message, username, time }) => (
          <Text key={message}>
            {message} - {username} - {time}
          </Text>
        ))}
      </Stack>
    </>
  );
}
