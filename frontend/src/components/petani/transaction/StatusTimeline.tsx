"use client";

import { TimelineEvent } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

interface StatusTimelineProps {
  events: TimelineEvent[];
}

export default function StatusTimeline({ events }: StatusTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white rounded-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-bold text-[#12241A] text-lg mb-5">Status Transaksi</h3>
      
      <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
        {events.map((event, index) => {
          const isCompleted = event.status === "completed";
          const isCurrent = event.status === "current";
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="relative pl-6">
              {/* Dot */}
              <div 
                className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 ${
                  isCompleted ? "bg-[#2A4736] border-4 border-[#F8F9FA]" : 
                  isCurrent ? "bg-white border-4 border-[#2A4736] shadow-[0_0_0_4px_rgba(42,71,54,0.1)] animate-pulse" : 
                  "bg-gray-200 border-4 border-white"
                }`}
              />

              {/* Connecting line fill (if completed) */}
              {!isLast && isCompleted && (
                <div className="absolute w-[2px] bg-[#2A4736] -left-[8px] top-5 bottom-[-24px]" />
              )}

              <div>
                <h4 className={`text-sm font-bold ${isCompleted || isCurrent ? "text-[#12241A]" : "text-gray-400"}`}>
                  {event.label}
                </h4>
                {event.description && (
                  <p className={`text-xs mt-1 font-medium ${isCompleted || isCurrent ? "text-gray-500" : "text-gray-400"}`}>
                    {event.description}
                  </p>
                )}
                {event.timestamp && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    {formatShortDate(event.timestamp)} • {new Date(event.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
