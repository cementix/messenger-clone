"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
}

const ProfileDrawer = ({ isOpen, onClose, data }: ProfileDrawerProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const otherUser = useOtherUser(data);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, []);
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);
  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </TransitionChild>
          <div className="fixed inset-0 oveflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="right-0 fixed inset-y-0 flex pl-10 max-w-full pointer-events-none">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex flex-col bg-white shadow-xl py-6 h-full overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex justify-end items-start">
                          <div className="flex items-center ml-3 h-7">
                            <button
                              onClick={onClose}
                              type="button"
                              className="bg-white rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 mt-6 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div className="text-gray-500 text-sm">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setIsConfirmModalOpen(true)}
                              className="flex flex-col items-center gap-3 hover:opacity-75 cursor-pointer"
                            >
                              <div className="flex justify-center items-center bg-neutral-100 rounded-full w-10 h-10">
                                <IoTrash size={20} />
                              </div>
                              <div className="font-light text-neutral-600 text-sm">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="sm:px-0 pt-5 sm:pt-0 pb-5 w-full">
                            <dl className="space-y-8 sm:space-y-6 px-4 sm:px-6">
                              {!data.isGroup && (
                                <>
                                  <div>
                                    <dt className="sm:flex-shrink-0 sm:w-40 font-medium text-gray-500 text-sm">
                                      Email
                                    </dt>
                                    <dd className="sm:col-span-2 mt-1 text-gray-900 text-sm">
                                      {otherUser.email}
                                    </dd>
                                  </div>
                                  <hr />
                                  <div>
                                    <dt className="sm:flex-shrink-0 sm:w-40 font-medium text-gray-500 text-sm">
                                      Joined
                                    </dt>
                                    <dd className="sm:col-span-2 mt-1 text-gray-900 text-sm">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
