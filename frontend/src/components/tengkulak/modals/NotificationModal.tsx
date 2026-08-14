import React from 'react';
import { X, Bell, TrendingUp, Tag, ShieldAlert, Check } from 'lucide-react';
import { NotificationItem } from "@/components/tengkulak/types";

interface NotificationModalProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#12241A]">Notifikasi</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 px-2 py-1 rounded-md"
            >
              Tandai Dibaca
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                n.read
                  ? 'bg-gray-50 border-gray-100 opacity-80'
                  : 'bg-emerald-50/50 border-emerald-100 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.type === 'price_alert' && (
                    <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  {n.type === 'offer' && (
                    <Tag className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  )}
                  {n.type === 'system' && (
                    <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                  <h4 className="font-bold text-sm text-[#12241A]">{n.title}</h4>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed pl-6">
                {n.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
