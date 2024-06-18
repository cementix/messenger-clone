import getCurrentUser from "@/app/actions/getCurrentUser";
import { PropsWithChildren } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

const Sidebar = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>;
    </div>
  );
};

export default Sidebar;
