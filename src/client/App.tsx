import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatSidebar from "./components/ChatSidebar";

export default function App() {
  const theme = useMantineTheme();
  const [openedSidebar, setOpenedSidebar] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          position: "relative",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<ChatSidebar isOpened={openedSidebar} />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={openedSidebar}
                onClick={() => setOpenedSidebar(!openedSidebar)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>My Amazing GIF Chat App</Text>
          </div>
        </Header>
      }
    >
      <ChatBody />
      <ChatFooter />
    </AppShell>
  );
}
