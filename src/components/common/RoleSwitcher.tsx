"use client";
import { useState } from "react";
import { setRoleCookie } from "@/app/actions";
import { useRouter } from "next/navigation";

// Using the mock IDs from the database seeder
const FARMER_ID = "u1";
const TENGKULAK_ID = "t1";

export default function RoleSwitcher({ currentRoleId }: { currentRoleId: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const isFarmer = currentRoleId === FARMER_ID;
  const targetId = isFarmer ? TENGKULAK_ID : FARMER_ID;
  const label = isFarmer ? "Switch to Tengkulak" : "Switch to Farmer";

  const handleSwitch = async () => {
    setIsPending(true);
    try {
      await setRoleCookie(targetId);
      router.push("/");
    } finally {
      setIsPending(false);
    }
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
