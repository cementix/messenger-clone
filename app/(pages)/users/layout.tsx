import getUsers from "@/app/actions/getUsers";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import UserList from "./UserList";

export default async function UsersLayout({ children }: PropsWithChildren) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
      ;
    </Sidebar>
  );
}
