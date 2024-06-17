"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div className="bottom-0 z-40 fixed flex justify-between items-center lg:hidden bg-white border-t-[1px] w-full">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
