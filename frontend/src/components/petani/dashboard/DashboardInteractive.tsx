"use client";

import React, { useState } from "react";
import { MarketPrice } from "@/lib/types";
import PFICalculator from "./PFICalculator";
import MarketPriceSection from "./MarketPriceSection";

export default function DashboardInteractive({ initialMarketPrices }: { initialMarketPrices: MarketPrice[] }) {
  // Get unique commodity names and locations for filter chips
  const commodities = Array.from(new Set(initialMarketPrices.map(p => p.commodity.name)));
  // Ensure we have at least one valid commodity if not empty
  const defaultCommodity = commodities.length > 0 ? commodities[0] : "";
  
  const [selectedCommodity, setSelectedCommodity] = useState<string>(defaultCommodity);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");

  const locations = ["Semua", "Brebes", "Bandung", "Malang", "Wonosobo", "Garut", "Nganjuk", "Kediri", "Enrekang", "Bima", "Agam"];

  // Filter prices based on selection
  const filteredPrices = initialMarketPrices.filter(p => {
    const matchCommodity = p.commodity.name === selectedCommodity;
    const matchLocation = selectedLocation === "Semua" || p.location === selectedLocation;
    return matchCommodity && matchLocation;
  });

  // If a specific commodity is selected, set its consumer price as the default for PFI
  // If a specific commodity is selected, set its consumer price as the default for PFI
  const defaultMarketPrice = filteredPrices.length > 0 
    ? filteredPrices[0].consumerPrice 
    : undefined;

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="animate-slide-up space-y-4">
        <div>
          <h2 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2 px-1">Wilayah</h2>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-white rounded-[16px] border border-gray-200/80 px-4 py-2.5 text-sm font-semibold text-[#12241A] focus:outline-none focus:border-[#2A4736] focus:ring-1 focus:ring-[#2A4736] shadow-sm appearance-none"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div>
          <h2 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-3 px-1">Kategori Komoditas</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {commodities.map((commodity) => (
              <button
                key={commodity}
                onClick={() => setSelectedCommodity(commodity)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedCommodity === commodity
                    ? "bg-[#2A4736] text-white shadow-md scale-100"
                    : "bg-white text-gray-500 border border-gray-200/80 hover:bg-gray-50 active:scale-95"
                }`}
              >
                {commodity}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PFICalculator defaultMarketPrice={defaultMarketPrice} />
      
      <MarketPriceSection marketPrices={filteredPrices} />
    </div>
  );
}
