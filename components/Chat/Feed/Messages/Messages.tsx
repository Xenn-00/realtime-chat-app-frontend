import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import {
  MessagesData,
  MessageSubscriptionData,
  MessagesVariable,
} from "../../../../util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { toast } from "react-hot-toast";
import SkeletonLoader from "../../../common/SkeletonLoader";
import MessageItem from "./MessageItem";
import { useEffect } from "react";
import user from "../../../../graphql/operations/user";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariable
  >(MessageOperations.Query.messages, {
    variables: { conversationId },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) return prev;

        const newMessage = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToMoreMessages(conversationId);
  }, [conversationId]);

  if (error) {
    return null;
  }

  return (
    <Flex direction={"column"} justify={"flex-end"} overflow={"hidden"}>
      {loading && (
        <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height="50px" />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction={"column-reverse"} overflowY="scroll" height={"100%"}>
          {data.messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              sentByMe={message.sender.id === userId}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
