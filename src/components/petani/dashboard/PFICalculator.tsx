"use client";

import React, { useState, useEffect } from "react";
import { calculatePFI } from "@/lib/utils";

export default function PFICalculator({ defaultMarketPrice }: { defaultMarketPrice?: number }) {
  const [farmerPrice, setFarmerPrice] = useState<number>(28000);
  const [marketPrice, setMarketPrice] = useState<number>(defaultMarketPrice || 35000);
  const [pfiResult, setPfiResult] = useState(calculatePFI(28000, defaultMarketPrice || 35000));
  
  useEffect(() => {
    if (defaultMarketPrice) {
      setMarketPrice(defaultMarketPrice);
    }
  }, [defaultMarketPrice]);

  useEffect(() => {
    setPfiResult(calculatePFI(farmerPrice || 0, marketPrice || 0));
  }, [farmerPrice, marketPrice]);

  const percentage = Math.min(Math.max(pfiResult.score, 0), 100);
  
  // SVG Arc calculation
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * (circumference / 2);

  let gaugeColor = "#EF4444"; // red
  if (pfiResult.score >= 90) gaugeColor = "#52B788"; // green
  else if (pfiResult.score >= 75) gaugeColor = "#F59E0B"; // yellow

  return (
    <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 animate-scale-in">
      <h2 className="text-lg font-bold text-[#12241A] mb-4">Price Fairness Index</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-[9px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">Harga Petani</label>
          <input 
            type="number" 
            className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm font-extrabold text-[#12241A] focus:outline-none focus:border-[#2A4736] focus:ring-1 focus:ring-[#2A4736]"
            value={farmerPrice}
            onChange={(e) => setFarmerPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <label className="block text-[9px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">Harga Pasar</label>
          <input 
            type="number" 
            className="w-full bg-gray-100/70 border border-gray-200/50 rounded-xl px-4 py-2.5 text-sm font-extrabold text-gray-500 cursor-not-allowed"
            value={marketPrice}
            readOnly
          />
        </div>
      </div>

      <div className="flex flex-col items-center relative h-32">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="absolute top-0 transform -rotate-180"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset: circumference / 2 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          <circle
            stroke={gaugeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ 
              strokeDashoffset,
              transition: "stroke-dashoffset 0.5s ease-in-out" 
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-8 flex flex-col items-center">
          <span className="text-3xl font-black" style={{ color: gaugeColor }}>
            {pfiResult.score.toFixed(0)}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-1">PFI Score</span>
        </div>
      </div>

      <div className="text-center mt-2">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
          pfiResult.score >= 90 ? "bg-green-100 text-green-700" :
          pfiResult.score >= 75 ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        }`}>
          {pfiResult.label}
        </span>
        <p className="text-xs text-gray-500 px-4">{pfiResult.description}</p>
      </div>
    </div>
  );
}
