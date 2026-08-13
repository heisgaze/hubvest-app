"use client";

import React, { useState } from "react";
import { MarketPrice } from "@/lib/types";
import PFICalculator from "./PFICalculator";
import MarketPriceSection from "./MarketPriceSection";

export default function DashboardInteractive({ initialMarketPrices }: { initialMarketPrices: MarketPrice[] }) {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("Semua");

  // Get unique commodity names for filter chips
  const commodities = ["Semua", ...Array.from(new Set(initialMarketPrices.map(p => p.commodity.name)))];

  // Filter prices based on selection
  const filteredPrices = selectedCommodity === "Semua" 
    ? initialMarketPrices 
    : initialMarketPrices.filter(p => p.commodity.name === selectedCommodity);

  // If a specific commodity is selected, set its consumer price as the default for PFI
  const defaultMarketPrice = selectedCommodity !== "Semua" && filteredPrices.length > 0 
    ? filteredPrices[0].consumerPrice 
    : undefined;

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="animate-slide-up">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 px-1">Kategori Komoditas</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {commodities.map((commodity) => (
            <button
              key={commodity}
              onClick={() => setSelectedCommodity(commodity)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCommodity === commodity
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {commodity}
            </button>
          ))}
        </div>
      </div>

      <PFICalculator defaultMarketPrice={defaultMarketPrice} />
      
      <MarketPriceSection marketPrices={filteredPrices} />
    </div>
  );
}
