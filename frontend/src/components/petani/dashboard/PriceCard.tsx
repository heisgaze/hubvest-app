import React from "react";
import { formatRupiah } from "@/lib/utils";
import { MarketPrice } from "@/lib/types";

export default function PriceCard({ data }: { data: MarketPrice }) {
  const isUp = data.trend === "up";
  
  const getEmoji = (name: string) => {
    switch (name) {
      case "Bawang Merah": return "🧅";
      case "Cabai": return "🌶️";
      case "Kentang": return "🥔";
      case "Tomat": return "🍅";
      case "Bawang Putih": return "🧄";
      case "Wortel": return "🥕";
      default: return "🥬";
    }
  };

  return (
    <div className="bg-white rounded-[26px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 min-w-[240px] flex-shrink-0 snap-center select-none">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl shadow-2xs">
            {getEmoji(data.commodity.name)}
          </div>
          <div>
            <h3 className="font-bold text-[#12241A] text-lg leading-snug">{data.commodity.name}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shrink-0 ${isUp ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
          {isUp ? "↑" : "↓"} {Math.abs(data.changePercent)}%
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Produsen</span>
          <span className="font-extrabold text-[#12241A]">{formatRupiah(data.producerPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Grosir</span>
          <span className="font-extrabold text-[#12241A]">{formatRupiah(data.wholesalePrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Konsumen</span>
          <span className="font-extrabold text-[#12241A]">{formatRupiah(data.consumerPrice)}</span>
        </div>
      </div>

      <div className="h-10 w-full">
        <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d">
          <polyline
            fill="none"
            stroke={isUp ? "#16803D" : "#DC2626"}
            strokeWidth="2"
            points={data.sparklineData.map((val, i) => `${i * (100 / (data.sparklineData.length - 1))},${30 - (val - Math.min(...data.sparklineData)) / (Math.max(...data.sparklineData) - Math.min(...data.sparklineData)) * 30}`).join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}
