"use client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
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
    </div>
  );
};

export default DesktopSidebar;
