import { User } from "@prisma/client";
import UserBox from "./UserBox";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <aside className="block lg:block left-0 lg:left-20 fixed inset-y-0 border-gray-200 pb-20 lg:pb-0 border-r w-full lg:w-80 overflow-y-auto">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 font-bold text-2xl text-neutral-800">Users</div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
