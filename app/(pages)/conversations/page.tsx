"use client";

import useConverastion from "@/app/hooks/useConversation";
import clsx from "clsx";
import EmptyState from "../users/EmptyState";

const ConversationsPage = () => {
  const { isOpen } = useConverastion();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
