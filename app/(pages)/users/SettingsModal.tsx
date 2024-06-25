"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal = ({
  isOpen,
  onClose,
  currentUser,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/settings`, data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-gray-900/10 pb-12 border-b">
            <h2 className="font-semibold text-base text-gray-900 leading-7">
              Profile
            </h2>
            <p className="mt-1 text-gray-600 text-sm leading-6">
              Edit your public information
            </p>
            <div className="flex flex-col gap-y-9 mt-10">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block font-medium text-gray-900 text-sm leading-6">
                  Photo
                </label>
                <div className="flex items-center gap-x-3 mt-2">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="oeigxkxm"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-6 mt-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
