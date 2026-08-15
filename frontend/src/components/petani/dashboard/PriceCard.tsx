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
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.location}
            </p>
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
