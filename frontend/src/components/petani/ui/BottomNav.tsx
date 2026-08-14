"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "HOME",
    href: "/",
    icon: (active: boolean) => (
      <svg
        className={`w-5 h-5 stroke-[2.2] ${active ? 'text-[#12241A]' : 'text-[#8E9B93]'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "LISTING",
    href: "/listing",
    icon: (active: boolean) => (
      <svg
        className={`w-5 h-5 stroke-[2.2] ${active ? 'text-[#12241A]' : 'text-[#8E9B93]'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    label: "SCAN",
    href: "/scan",
    icon: (active: boolean) => (
      <svg
        className={`w-5 h-5 stroke-[2.2] ${active ? 'text-[#12241A]' : 'text-[#8E9B93]'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    label: "CHAT",
    href: "/chat",
    icon: (active: boolean) => (
      <svg
        className={`w-5 h-5 stroke-[2.2] ${active ? 'text-[#12241A]' : 'text-[#8E9B93]'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: "PROFIL",
    href: "/profile",
    icon: (active: boolean) => (
      <svg
        className={`w-5 h-5 stroke-[2.2] ${active ? 'text-[#12241A]' : 'text-[#8E9B93]'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="absolute bottom-2 left-0 right-0 z-30 px-3 pb-1 pt-1 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-2 flex items-center justify-around shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200/80 pointer-events-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.href);

          const isScan = tab.href === "/scan";

          if (isScan) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center flex-1 py-0.5 group transition-all duration-200"
              >
                {/* Protruding Scan Button Wrapper occupying exact same height as other icons (h-8) */}
                <div className="h-8 flex items-end justify-center relative w-full">
                  <div
                    className={`absolute bottom-0 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_4px_20px_rgba(42,71,54,0.3)] bg-[#2A4736] text-white group-hover:bg-[#1f3729] ${
                      active ? 'scale-105' : ''
                    }`}
                  >
                    <svg
                      className="w-6 h-6 stroke-[2.5] text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] font-bold tracking-wider mt-0.5 transition-colors ${
                    active ? 'text-[#12241A]' : 'text-[#8E9B93]'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 py-0.5 group transition-all duration-200"
            >
              {/* Active Icon Background Capsule */}
              <div
                className={`w-12 h-8 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  active
                    ? 'bg-[#E2F4EB] scale-105 shadow-xs'
                    : 'group-hover:bg-gray-50'
                }`}
              >
                {tab.icon(active)}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold tracking-wider mt-0.5 transition-colors ${
                  active ? 'text-[#12241A]' : 'text-[#8E9B93]'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

