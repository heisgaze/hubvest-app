"use client";

import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  // Format the time from ISO string
  const time = new Date(message.timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isCurrentUser) {
    return (
      <div className="flex flex-col items-end mb-4 animate-fade-in ml-12">
        <div className="bg-[#2A4736] text-white px-4 py-2.5 rounded-[20px] rounded-br-sm shadow-md">
          <p className="text-sm font-medium leading-relaxed">{message.text}</p>
        </div>
        <span className="text-[9px] font-bold tracking-wide uppercase text-gray-400 mt-1.5 mr-1">{time}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start mb-4 animate-fade-in mr-12">
      <div className="bg-white border border-gray-100/90 text-[#12241A] px-4 py-2.5 rounded-[20px] rounded-bl-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <p className="text-sm font-medium leading-relaxed">{message.text}</p>
      </div>
      <span className="text-[9px] font-bold tracking-wide uppercase text-gray-400 mt-1.5 ml-1">{time}</span>
    </div>
  );
}
