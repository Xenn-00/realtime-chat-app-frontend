import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useColorMode, Button } from "@chakra-ui/react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat/Chat";

export default function Home() {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      <header>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌑" : "🌞"}
        </Button>
      </header>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
