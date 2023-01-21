import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessagesHeader from "./Messages/Header";
import MessageInput from "./Messages/Input";
import Messages from "./Messages/Messages";
import NoConversation from "./NoConversationSelected";

interface Props {
  session: Session;
}

function FeedWrapper({ session }: Props) {
  const router = useRouter();

  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width={"100%"}
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction={"column"}
            justify={"space-between"}
            overflow={"hidden"}
            flexGrow={1}
          >
            <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages conversationId={conversationId} userId={userId} />
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
}

export default FeedWrapper;
