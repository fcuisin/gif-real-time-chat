import { Container, Title } from "@mantine/core";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";

export default function App() {
  return (
    <Container fluid p="lg">
      <ChatBody />
      <ChatFooter />
    </Container>
  );
}
