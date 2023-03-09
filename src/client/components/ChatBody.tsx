import { Anchor, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { EVENTS } from "../config/constants";

import { useSockets } from "../contexts/SocketContext";

export default function ChatBody() {
  const { socket, messages, rooms } = useSockets();
  const [roomName, setRoomName] = useState<string>("");

  const onCreateRoom = () => {
    if (!roomName.trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_CHANNEL, { roomName });
    setRoomName("");
  };

  const handleJoinRoom = (roomId: string) => {
    socket.emit(EVENTS.CLIENT.JOIN_CHANNEL, { roomId });
  };

  return (
    <Stack spacing="xl">
      <Group align="flex-end">
        <TextInput
          label="Room Name"
          value={roomName}
          onChange={({ currentTarget }) => setRoomName(currentTarget.value)}
        />
        <Button onClick={onCreateRoom}>Create Room</Button>
      </Group>
      <Text>List of channels</Text>
      {rooms?.map(({ id, name: roomName }) => (
        <Anchor key={id} onClick={() => handleJoinRoom(id)}>
          {roomName}
        </Anchor>
      ))}
      <Text>Messages</Text>
      {messages?.map(({ message, username, time }) => (
        <Text key={message}>
          {message} - {username} - {time}
        </Text>
      ))}
    </Stack>
  );
}
