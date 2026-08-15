import React from 'react';
import { MapPin, Bell } from 'lucide-react';

interface HeaderProps {
  location: string;
  unreadCount: number;
  currentTab?: string;
  onLocationClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  unreadCount,
  currentTab = 'HOME',
  onLocationClick,
  onNotificationClick,
  onProfileClick,
}) => {
  const isHome = currentTab === 'HOME';

  return (
    <header className="px-5 pt-3 pb-2 flex items-center justify-between bg-[#F8F9FA] sticky top-0 z-10">
      {isHome ? (
        /* HOME TAB HEADER: Avatar + Greeting + Location */
        <div className="flex items-center gap-3">
          {/* Person Avatar Photo */}
          <button
            onClick={onProfileClick}
            className="w-11 h-11 rounded-full bg-slate-200 text-white flex items-center justify-center shadow-xs overflow-hidden transition-transform active:scale-95 shrink-0 border border-gray-200/80"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
              alt="Budi Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Greeting & Location */}
          <div>
            <h1 className="font-bold text-[#12241A] text-lg leading-tight">
              Halo, Budi
            </h1>

            <button
              onClick={onLocationClick}
              className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:text-emerald-800 transition-colors mt-0.5"
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{location}</span>
            </button>
          </div>
        </div>
      ) : (
        /* MARKET & OTHER TABS HEADER: Location Selector + Brand + Bell */
        <>
          <button
            onClick={onLocationClick}
            className="flex items-center gap-1.5 text-left active:scale-95 transition-transform group"
          >
            <div className="w-8 h-8 rounded-full border border-emerald-600/25 bg-emerald-50/80 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-emerald-100">
              <MapPin className="w-4 h-4 text-emerald-800" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 tracking-wider uppercase leading-none">
                WILAYAH
              </div>
              <div className="text-xs font-extrabold text-[#12241A] mt-0.5 leading-tight">
                {location}
              </div>
            </div>
          </button>

          <div
            onClick={onProfileClick}
            className="font-black text-xl text-[#2A4736] tracking-tight cursor-pointer select-none"
          >
            Hubvest
          </div>
        </>
      )}

      {/* Right Notification Bell */}
      <button
        onClick={onNotificationClick}
        className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-2xs border border-gray-200/80 hover:bg-gray-50 active:scale-95 transition-all relative shrink-0"
        aria-label="Notifikasi"
      >
        <Bell className="w-4 h-4 text-emerald-900" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
        )}
      </button>
    </header>
  );
};


