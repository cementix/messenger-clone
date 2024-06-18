import getConversations from "@/app/actions/getConversations";
import { PropsWithChildren } from "react";
import Sidebar from "../users/Sidebar";
import ConversationList from "./ConversationList";

const ConversationsLayout = async ({ children }: PropsWithChildren) => {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
