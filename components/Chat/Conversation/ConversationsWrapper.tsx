import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationsList from "./ConversationsList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationData } from "../../../util/types";
import { ConversationPopulated } from "../../../../backend/src/util/types";
import { useRouter } from "next/router";

interface Props {
  session: Session;
}

function ConversationsWrapper({ session }: Props) {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore,
  } = useQuery<ConversationData, null>(
    ConversationOperations.Queries.conversations
  );

  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const onViewConversation = async (conversationId: string) => {
    /* 
      1. Push the COnversationId to the router query params
    */
    router.push({ query: { conversationId } });

    /* 
      2. Mark the conversation as read
    */
  };

  const subscriptToNewConversation = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        console.log("Here is subcription data", subscriptionData);

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscriptToNewConversation();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      <ConversationsList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
}

export default ConversationsWrapper;
