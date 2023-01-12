import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { MessagesData, MessagesVariable } from "../../../../util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { toast } from "react-hot-toast";

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

  console.log("HERE IS MESSAGES DATA", data);
  return (
    <Flex direction={"column"} justify={"flex-end"} overflow={"hidden"}>
      {loading && (
        <Stack>
          <span>Loading Messages</span>
        </Stack>
      )}
      {data?.messages && (
        <Flex direction={"column-reverse"} overflowY="scroll" height={"100%"}>
          {data.messages.map((message) => (
            <div key={message.body}>{message.body}</div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
