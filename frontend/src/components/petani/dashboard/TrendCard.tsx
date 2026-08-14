import React from "react";

interface TrendCardProps {
  commodityName: string;
  priceChange: number;
  trendDirection: "up" | "down";
}

export default function TrendCard({ commodityName, priceChange, trendDirection }: TrendCardProps) {
  const isUp = trendDirection === "up";
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-[26px] border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-lg shadow-2xs">
          {commodityName.includes("Bawang") ? "🧅" : commodityName.includes("Cabai") ? "🌶️" : "🌾"}
        </div>
        <span className="font-bold text-base text-[#12241A]">{commodityName}</span>
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-3.5 py-1.5 rounded-full ${isUp ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
        {isUp ? "↑" : "↓"} {Math.abs(priceChange)}%
      </div>
    </div>
  );
}
