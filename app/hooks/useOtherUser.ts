import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser;
  }, [session?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
