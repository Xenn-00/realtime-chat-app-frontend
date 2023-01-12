import { Flex, Stack, Text } from "@chakra-ui/react";
import { SearchUsers } from "../../../../util/types";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
  participants: Array<SearchUsers>;
  removeParticipant: (userId: string) => void;
}

function Participants({ participants, removeParticipant }: Props) {
  console.log("HERE ARE THE PARTICIPANTS", participants);
  return (
    <Flex mt={8} gap={"10px"}>
      {participants.map((participant) => (
        <Stack
          direction="row"
          key={participant.id}
          align={"center"}
          bg={"whiteAlpha.200"}
          borderRadius={4}
          p={2}
        >
          <Text>{participant.username}</Text>
          <IoCloseCircleOutline
            size={"20px"}
            cursor={"pointer"}
            onClick={() => removeParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
}

export default Participants;
