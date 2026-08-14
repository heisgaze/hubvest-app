"use client";

import React from "react";
import PriceCard from "./PriceCard";
import { MarketPrice } from "@/lib/types";

export default function MarketPriceSection({ marketPrices }: { marketPrices: MarketPrice[] }) {
  return (
    <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-lg font-bold text-[#12241A]">Harga Pasar Hari Ini</h2>
        <a href="#" className="text-xs font-bold text-[#2A4736] hover:text-[#1f3729]">Lihat Semua</a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-4 px-4">
        {marketPrices.map((price, idx) => (
          <PriceCard key={idx} data={price} />
        ))}
      </div>
    </div>
  );
}
