import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import { PropsWithChildren } from "react";
import Sidebar from "../users/Sidebar";
import ConversationList from "./ConversationList";

const ConversationsLayout = async ({ children }: PropsWithChildren) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
