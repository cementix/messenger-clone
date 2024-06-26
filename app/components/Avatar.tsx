"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

const Avatar = ({ user }: { user?: User }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="inline-block relative rounded-full w-11 h-11 overflow-hidden">
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
        />
      </div>
      {isActive && <span className="block top-0 right-0 absolute bg-green-500 rounded-full w-2 md:w-3 h-2 md:h-3 ring-2 ring-white" />}
    </div>
  );
};

export default Avatar;
