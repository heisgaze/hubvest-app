"use client";

import React, { useState, useEffect } from "react";
import { calculatePFI } from "@/lib/utils";

export default function PFICalculator() {
  const [farmerPrice, setFarmerPrice] = useState<number>(28000);
  const [marketPrice, setMarketPrice] = useState<number>(35000);
  const [pfiResult, setPfiResult] = useState(calculatePFI(28000, 35000));
  
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
  if (pfiResult.score >= 80) gaugeColor = "#52B788"; // green
  else if (pfiResult.score >= 60) gaugeColor = "#F59E0B"; // yellow

  return (
    <div className="card p-5 animate-scale-in">
      <h2 className="text-lg font-semibold text-primary mb-4">Price Fairness Index</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Harga Petani</label>
          <input 
            type="number" 
            className="w-full bg-surface-bg border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            value={farmerPrice}
            onChange={(e) => setFarmerPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Harga Pasar</label>
          <input 
            type="number" 
            className="w-full bg-surface-bg border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            value={marketPrice}
            onChange={(e) => setMarketPrice(Number(e.target.value))}
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
          <span className="text-3xl font-bold" style={{ color: gaugeColor }}>
            {pfiResult.score.toFixed(0)}
          </span>
          <span className="text-xs text-gray-500 font-medium mt-1">PFI Score</span>
        </div>
      </div>

      <div className="text-center mt-2">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
          pfiResult.score >= 80 ? "bg-green-100 text-green-700" :
          pfiResult.score >= 60 ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        }`}>
          {pfiResult.label}
        </span>
        <p className="text-xs text-gray-500 px-4">{pfiResult.description}</p>
      </div>
    </div>
  );
}
