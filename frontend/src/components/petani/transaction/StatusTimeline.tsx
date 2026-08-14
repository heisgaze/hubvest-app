"use client";

import { TimelineEvent } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

interface StatusTimelineProps {
  events: TimelineEvent[];
}

export default function StatusTimeline({ events }: StatusTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-bold text-gray-800 mb-4">Status Transaksi</h3>
      
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
                  isCompleted ? "bg-primary border-4 border-surface-bg" : 
                  isCurrent ? "bg-white border-4 border-primary shadow-[0_0_0_4px_rgba(27,67,50,0.1)] animate-pulse" : 
                  "bg-gray-200 border-4 border-white"
                }`}
              />

              {/* Connecting line fill (if completed) */}
              {!isLast && isCompleted && (
                <div className="absolute w-[2px] bg-primary -left-[8px] top-5 bottom-[-24px]" />
              )}

              <div>
                <h4 className={`text-sm font-semibold ${isCompleted || isCurrent ? "text-gray-800" : "text-gray-400"}`}>
                  {event.label}
                </h4>
                {event.description && (
                  <p className={`text-xs mt-1 ${isCompleted || isCurrent ? "text-gray-600" : "text-gray-400"}`}>
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
