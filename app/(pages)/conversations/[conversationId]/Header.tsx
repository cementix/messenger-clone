"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

const Header = ({
  conversation,
}: {
  conversation: Conversation & { users: User[] };
}) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);
  return (
    <div className="flex justify-between items-center bg-white shadow-sm px-4 sm:px-4 lg:px-6 py-3 border-b-[1px] w-full">
      <div className="flex items-center gap-3">
        <Link
          className="block lg:hidden text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="font-light text-neutral-500 text-sm">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
      />
    </div>
  );
};

export default Header;
