import React from 'react';
import { Home, Store, ReceiptText, User } from 'lucide-react';
import { TabType } from "@/components/tengkulak/types";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'HOME' as TabType, label: 'HOME', icon: Home },
    { id: 'MARKET' as TabType, label: 'MARKET', icon: Store },
    { id: 'ORDERS' as TabType, label: 'ORDERS', icon: ReceiptText },
    { id: 'PROFILE' as TabType, label: 'PROFILE', icon: User },
  ];

  return (
    <nav className="absolute bottom-2 left-0 right-0 z-30 px-3 pb-1 pt-1 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-2 flex items-center justify-around shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200/80 pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-0.5 group transition-all duration-200"
            >
              {/* Active Icon Background Capsule */}
              <div
                className={`w-12 h-8 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E2F4EB] text-[#12241A] scale-105 shadow-xs'
                    : 'text-[#8E9B93] group-hover:text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 stroke-[2.2] ${isActive ? 'text-[#12241A]' : 'text-[#8E9B93]'}`} />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold tracking-wider mt-0.5 transition-colors ${
                  isActive ? 'text-[#12241A]' : 'text-[#8E9B93]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

