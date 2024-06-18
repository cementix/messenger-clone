"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UserBox = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);
  return (
    <div
      onClick={handleClick}
      className="relative flex items-center space-x-3 bg-white hover:bg-neutral-100 p-3 rounded-lg w-full transition cursor-pointer"
    >
      <Avatar user={user} />
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-gray-900 text-sm">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
