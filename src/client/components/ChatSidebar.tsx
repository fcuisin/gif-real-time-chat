import { Anchor, Group, Navbar, Stack, Text } from "@mantine/core";

import { EVENTS } from "../config/constants";
import { useSockets } from "../contexts/SocketContext";
import AddChannelBox from "./AddChannelBox";

export default function ChatSidebar({ isOpened }: { isOpened: boolean }) {
  const { socket, rooms } = useSockets();

  const handleJoinRoom = (roomId: string): void => {
    socket.emit(EVENTS.CLIENT.JOIN_CHANNEL, { roomId });
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{ sm: 300, lg: 300 }}
    >
      <Navbar.Section>
        <Group position="apart" mb={!isOpened ? "lg" : "sm"}>
          <Text size="sm" weight={500}>
            Channels
          </Text>
          <AddChannelBox />
        </Group>
        <Stack spacing={5}>
          {rooms?.map(({ id, name: roomName }) => (
            <Anchor
              key={id}
              color="dimmed"
              sx={() => ({
                "&:hover": {
                  textDecoration: "none",
                },
              })}
              onClick={() => handleJoinRoom(id)}
            >
              # {roomName}
            </Anchor>
          ))}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
