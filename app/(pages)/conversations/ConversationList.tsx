"use client";

import useConverastion from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
  const session = useSession();
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { conversationId, isOpen } = useConverastion();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    pusherClient.bind("conversation:new", newHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
    };
  }, [pusherKey]);

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `fixed inset pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5 h-screen">
          <div className="flex justify-between mb-4 pt-4">
            <div className="font-bold text-2xl text-neutral-800">Messages</div>
            <div className="bg-gray-100 hover:opacity-75 p-2 rounded-full text-gray-600 transition cursor-pointer">
              <MdOutlineGroupAdd
                size={20}
                onClick={() => setIsModalOpen(true)}
              />
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
    </>
  );
};

export default ConversationList;
