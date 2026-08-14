"use client";

import { useTransition } from "react";
import { setRoleCookie } from "@/app/actions";

// Using the mock IDs from the database seeder
const FARMER_ID = "5a351aad-6070-4264-a6e0-bed3232ab399";
const TENGKULAK_ID = "c25594e8-7901-40ae-b202-da8d1512990d";

export default function RoleSwitcher({ currentRoleId }: { currentRoleId: string }) {
  const [isPending, startTransition] = useTransition();

  const isFarmer = currentRoleId === FARMER_ID;
  const targetId = isFarmer ? TENGKULAK_ID : FARMER_ID;
  const label = isFarmer ? "Switch to Tengkulak" : "Switch to Farmer";

  const handleSwitch = () => {
    startTransition(() => {
      setRoleCookie(targetId);
      window.location.href = "/";
    });
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <button
        onClick={handleSwitch}
        disabled={isPending}
        className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-full shadow-xl opacity-90 hover:opacity-100 transition-opacity flex items-center gap-2"
      >
        {isPending ? (
          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          "🔄"
        )}
        {label}
      </button>
    </div>
  );
}
