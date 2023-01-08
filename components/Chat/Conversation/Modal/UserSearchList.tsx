import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchUsers } from "../../../../util/types";

interface Props {
  users: Array<SearchUsers>;
  addParticipant: (user: SearchUsers) => void;
}

function UserSearchList({ users, addParticipant }: Props) {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify={"center"}>
          <Text>No users found :</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction={"row"}
              align={"center"}
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar src={user.image} size={"sm"} />
              <Flex justify={"space-between"} width={"100%"} align={"center"}>
                <Text color={"whiteAlpha.700"}>{user.username}</Text>
                <Button
                  bg={"brand.100"}
                  _hover={{ bg: "brand.100" }}
                  size={"sm"}
                  onClick={() => addParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}

export default UserSearchList;
