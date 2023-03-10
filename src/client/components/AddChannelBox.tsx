import { useState } from "react";

import {
  ActionIcon,
  Button,
  Group,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";

import { EVENTS } from "../config/constants";
import { useSockets } from "../contexts/SocketContext";

export default function AddChannelBox() {
  const { socket } = useSockets();
  const [openedBox, setOpenedBox] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");

  const onCreateRoom = (): void => {
    if (!roomName.trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_CHANNEL, { roomName });
    setRoomName("");
  };

  return (
    <>
      <Tooltip label="Create a new channel" withArrow position="right">
        <ActionIcon variant="default" onClick={() => setOpenedBox(!openedBox)}>
          {!openedBox ? `+` : `-`}
        </ActionIcon>
      </Tooltip>
      {openedBox && (
        <Group align="flex-end">
          <TextInput
            label={<Text size="xs">Name</Text>}
            placeholder="My amazing channel..."
            value={roomName}
            onChange={({ currentTarget }) => setRoomName(currentTarget.value)}
          />
          <Button onClick={onCreateRoom}>Add</Button>
        </Group>
      )}
    </>
  );
}
