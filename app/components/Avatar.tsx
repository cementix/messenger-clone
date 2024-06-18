"use client";

import { User } from "@prisma/client";
import Image from "next/image";

const Avatar = ({ user }: { user?: User }) => {
  return (
    <div className="relative">
      <div className="inline-block relative rounded-full md:w-11 h-9 md:h-11 overflow-hidden">
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
        />
      </div>
      <span className="block top-0 right-0 absolute bg-green-500 rounded-full w-2 md:w-3 h-2 md:h-3 ring-2 ring-white" />
    </div>
  );
};

export default Avatar;
