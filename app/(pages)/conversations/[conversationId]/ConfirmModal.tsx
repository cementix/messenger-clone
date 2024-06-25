"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="flex flex-shrink-0 justify-center items-center bg-red-100 mx-auto sm:mx-0 rounded-full w-12 sm:w-10 h-12 sm:h-10">
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <DialogTitle
            as="h3"
            className="font-semibold text-base text-gray-900 leading-6"
          >
            Delete conversation
          </DialogTitle>
          <div className="mt-2">
            <p className="text-gray-500 text-sm">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-row-reverse gap-2 mt-5 sm:mt-4">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
