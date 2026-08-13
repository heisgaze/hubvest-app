"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { chatMessages, chatPreviews, currentUser } from "@/lib/mock-data";
import { Message } from "@/lib/types";

export default function ChatRoomPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;
  
  // Find chat details for the header
  const chatDetails = chatPreviews.find(c => c.id === chatId);
  
  const [messages, setMessages] = useState<Message[]>(chatMessages[chatId] || []);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: chatId,
      senderId: currentUser.id,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      type: 'text' as const,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  if (!chatDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chat Tidak Ditemukan</h2>
        <button 
          onClick={() => router.back()}
          className="btn-primary px-6"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg pt-[60px] pb-[130px]">
      {/* Custom Header */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto h-[60px] bg-white border-b border-gray-100 flex items-center px-4 z-40">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 -ml-2 mr-1 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary font-bold">
              {chatDetails.participant.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="font-semibold text-gray-900 text-sm leading-tight">
                {chatDetails.participant.name}
              </h1>
              {chatDetails.participant.verified && (
                <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="text-center my-4">
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Hari ini
          </span>
        </div>
        
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isCurrentUser={msg.senderId === currentUser.id} 
            />
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-gray-400">
            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">Mulai percakapan baru</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="fixed bottom-[65px] left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 p-3 z-30 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-50 border border-gray-100 text-gray-800 text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="Tulis pesan..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-gray-300 transition-colors"
          >
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
