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
        <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-br-sm shadow-sm">
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-[10px] text-gray-400 mt-1 mr-1">{time}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start mb-4 animate-fade-in mr-12">
      <div className="bg-white border border-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
        <p className="text-sm">{message.text}</p>
      </div>
      <span className="text-[10px] text-gray-400 mt-1 ml-1">{time}</span>
    </div>
  );
}
