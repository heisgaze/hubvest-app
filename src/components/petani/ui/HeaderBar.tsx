"use client";

import { useRouter } from "next/navigation";
import { MapPin, Bell } from "lucide-react";

interface HeaderBarProps {
  title?: string;
  showBack?: boolean;
  transparent?: boolean;
  rightActions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeaderBar({
  title,
  showBack = false,
  transparent = false,
  rightActions,
  children,
}: HeaderBarProps) {
  const router = useRouter();
  
  // If no back button and no title, assume it's the home header style
  // If title is passed but showBack is false, it's still a subpage (e.g. Listing)
  const isHome = !showBack && !title;

  return (
    <header
      className={`sticky top-0 z-40 px-5 pt-3 pb-2 flex items-center justify-between transition-all ${
        transparent
          ? "bg-transparent"
          : "bg-[#F8F9FA]"
      }`}
    >
      <div className="flex items-center gap-3">
        {isHome ? (
          <>
            <button
              className="w-11 h-11 rounded-full bg-emerald-100 text-[#12241A] font-bold text-lg flex items-center justify-center shadow-xs overflow-hidden transition-transform active:scale-95 shrink-0 border border-gray-200/80"
            >
              P
            </button>
            <div>
              <h1 className="font-bold text-[#12241A] text-lg leading-tight">
                Halo, Pengguna
              </h1>
              <button
                className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:text-emerald-800 transition-colors mt-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Brebes, Jawa Tengah</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {showBack && (
              <button
                onClick={() => router.back()}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-gray-700 shadow-2xs border border-gray-200/80 hover:bg-gray-50 active:scale-95 transition-all"
                aria-label="Kembali"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {title && (
              <h1 className="text-lg font-bold text-[#12241A] leading-tight truncate">{title}</h1>
            )}
          </>
        )}
        {children}
      </div>
      
      {/* Notifications Right Action */}
      {isHome ? (
        <button
          className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-2xs border border-gray-200/80 hover:bg-gray-50 active:scale-95 transition-all relative shrink-0"
          aria-label="Notifikasi"
        >
          <Bell className="w-4 h-4 text-emerald-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
        </button>
      ) : rightActions ? (
        <div className="flex items-center gap-2">{rightActions}</div>
      ) : null}
    </header>
  );
}

