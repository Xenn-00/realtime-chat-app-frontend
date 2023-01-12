import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessagesHeader from "./Messages/Header";
import MessageInput from "./Messages/Input";

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
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <div>No conversation selected</div>
      )}
    </Flex>
  );
}

export default FeedWrapper;
