"use client";

import { useRouter } from "next/navigation";

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

  return (
    <header
      className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between ${
        transparent
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label="Kembali"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1A2E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {title && (
          <h1 className="text-lg font-bold text-text truncate">{title}</h1>
        )}
        {children}
      </div>
      {rightActions && (
        <div className="flex items-center gap-2">{rightActions}</div>
      )}
    </header>
  );
}
