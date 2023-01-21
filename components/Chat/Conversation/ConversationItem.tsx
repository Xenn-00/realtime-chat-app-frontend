import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { ConversationPopulated } from "../../../../backend/src/util/types";
import { formatUsernames, formatUserImage } from "../../../util/functions";

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

interface Props {
  conversation: ConversationPopulated;
  userId: string;
  onClick: () => void;
  isSelected: boolean;
  hasSeenLatestMessage: boolean | undefined;
}

function ConversationItem({
  conversation,
  userId,
  onClick,
  isSelected,
  hasSeenLatestMessage,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.type === "click") {
      onClick();
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      setMenuOpen(true);
    }
  };

  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      cursor={"pointer"}
      p={3}
      bg={isSelected ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      borderRadius={3}
      onClick={handleClick}
      position={"relative"}
    >
      <Flex>
        {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={"sm"} color="#69f84d" />
        )}
      </Flex>
      <Avatar
        src={formatUserImage(conversation.participants, userId)}
        size={"sm"}
      />
      <Flex justify="space-between" width="80%" height="100%" align={"center"}>
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right" fontSize={"sm"}>
          {formatRelative(conversation.updatedAt, new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  );
}

export default ConversationItem;
