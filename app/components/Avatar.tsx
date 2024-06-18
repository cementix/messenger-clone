"use client";

import { User } from "@prisma/client";
import Image from "next/image";

const Avatar = ({ user }: { user?: User }) => {
  return (
    <div className="relative">
      <div className="inline-block relative rounded-full md:w-11 h-9 md:h-11 overflow-hidden">
        <Image
          alt="Avatar"
          src={user?.image || "/image/placeholder.png"}
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
