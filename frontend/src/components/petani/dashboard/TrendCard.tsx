import React from "react";

interface TrendCardProps {
  commodityName: string;
  priceChange: number;
  trendDirection: "up" | "down";
}

export default function TrendCard({ commodityName, priceChange, trendDirection }: TrendCardProps) {
  const isUp = trendDirection === "up";
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm mb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-sm">
          {commodityName.includes("Bawang") ? "🧅" : commodityName.includes("Cabai") ? "🌶️" : "🌾"}
        </div>
        <span className="font-medium text-sm text-primary">{commodityName}</span>
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {isUp ? "↑" : "↓"} {Math.abs(priceChange)}%
      </div>
    </div>
  );
}
