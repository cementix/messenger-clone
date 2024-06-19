"use client";

import useConverastion from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

const ConversationList = ({
  initialItems,
}: {
  initialItems: FullConversationType[];
}) => {
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConverastion();
  return (
    <aside
      className={clsx(
        `fixed inset pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="font-bold text-2xl text-neutral-800">Messages</div>
          <div className="bg-gray-100 hover:opacity-75 p-2 rounded-full text-gray-600 transition cursor-pointer">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
