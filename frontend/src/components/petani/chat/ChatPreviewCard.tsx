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
      className="flex items-center gap-4 p-4 hover:bg-surface-bg transition-colors border-b border-gray-100 last:border-0"
    >
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center text-primary font-bold text-lg">
          {chat.participant.name.charAt(0).toUpperCase()}
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
            {chat.participant.name}
            {chat.participant.verified && (
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {timeAgo(chat.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {chat.lastMessage}
        </p>
      </div>
      
      {chat.unread > 0 && (
        <div className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
          {chat.unread}
        </div>
      )}
    </Link>
  );
}
