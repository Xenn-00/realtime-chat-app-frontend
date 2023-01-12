import { Box, Input, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  session,
  conversationId,
}) => {
  const [messageBody, setMessageBody] = useState("");

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // call sendMessage mutation
    } catch (error: any) {
      console.log("onSendMessage error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width={"100%"}>
      <form onSubmit={() => {}}>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          size={"md"}
          placeholder={"New Message"}
          resize={"none"}
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
