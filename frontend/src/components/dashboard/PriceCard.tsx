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
    <div className="card p-4 card-hover min-w-[240px] flex-shrink-0 snap-center">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-xl">
            {getEmoji(data.commodity.name)}
          </div>
          <div>
            <h3 className="font-semibold text-primary">{data.commodity.name}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isUp ? "↑" : "↓"} {Math.abs(data.changePercent)}%
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Produsen</span>
          <span className="font-semibold">{formatRupiah(data.producerPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Grosir</span>
          <span className="font-semibold">{formatRupiah(data.wholesalePrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Konsumen</span>
          <span className="font-semibold">{formatRupiah(data.consumerPrice)}</span>
        </div>
      </div>

      <div className="h-10 w-full">
        <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d">
          <polyline
            fill="none"
            stroke={isUp ? "#52B788" : "#EF4444"}
            strokeWidth="2"
            points={data.sparklineData.map((val, i) => `${i * (100 / (data.sparklineData.length - 1))},${30 - (val - Math.min(...data.sparklineData)) / (Math.max(...data.sparklineData) - Math.min(...data.sparklineData)) * 30}`).join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}
