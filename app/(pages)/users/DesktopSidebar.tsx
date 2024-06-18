"use client";

import Avatar from "@/app/components/Avatar";
import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = ({ currentUser }: { currentUser: User }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const routes = useRoutes();
  return (
    <div className="lg:left-0 lg:z-40 lg:fixed lg:inset-y-0 lg:flex lg:flex-col justify-between hidden lg:bg-white xl:px-6 lg:pb-4 lg:border-r-[1px] lg:w-20 lg:overflow-y-auto">
      <nav className="flex flex-col justify-between mt-4">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="flex flex-col justify-between items-center mt-4">
        <div
          onClick={() => setIsOpen(true)}
          className="hover:opacity-75 transition cursor-pointer"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
