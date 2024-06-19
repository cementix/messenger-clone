"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const { data: session } = useSession();
  const isOwn = session?.user?.email === data?.sender?.email;
  const seenList = data.seen || [];
  return <div>123</div>;
};

export default MessageBox;
