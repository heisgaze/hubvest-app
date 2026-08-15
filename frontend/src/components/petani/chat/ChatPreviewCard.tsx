"use client";

import Link from "next/link";
import { ChatPreview } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

interface ChatPreviewCardProps {
  chat: ChatPreview;
}

export function ChatPreviewCard({ chat }: ChatPreviewCardProps) {
  return (
    <Link 
      href={`/chat/${chat.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100/90 last:border-0"
    >
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#2A4736]/10 flex items-center justify-center text-[#2A4736] font-extrabold text-lg shadow-2xs">
          {chat.participant.name.charAt(0).toUpperCase()}
        </div>
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-xs"></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-[#12241A] truncate flex items-center gap-1.5">
            {chat.participant.name}
            {chat.participant.verified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </h3>
          <span className="text-[10px] font-bold tracking-wide uppercase text-gray-400 whitespace-nowrap ml-2">
            {timeAgo(chat.timestamp)}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-500 truncate">
          {chat.lastMessage}
        </p>
      </div>
      
      {chat.unread > 0 && (
        <div className="shrink-0 w-6 h-6 rounded-full bg-[#16803D] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
          {chat.unread}
        </div>
      )}
    </Link>
  );
}
