"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}: MessageInputProps) => {
  return <div></div>;
};

export default MessageInput;
