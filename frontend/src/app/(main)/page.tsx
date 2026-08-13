import React from "react";
import { currentUser, marketPrices } from "@/lib/mock-data";
import PFICalculator from "@/components/dashboard/PFICalculator";
import MarketPriceSection from "@/components/dashboard/MarketPriceSection";
import TrendCard from "@/components/dashboard/TrendCard";
import HeaderBar from "@/components/ui/HeaderBar";

export default function DashboardPage() {
  const trending = [
    { name: "Bawang Merah", change: 5.2, trend: "up" as const },
    { name: "Cabai Rawit", change: -2.1, trend: "down" as const },
    { name: "Beras Premium", change: 1.5, trend: "up" as const },
  ];

  const rightActions = (
    <div className="flex items-center gap-3">
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-bg relative">
        🔔
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold shadow-sm">
        {currentUser.name.charAt(0)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      <HeaderBar 
        title={`Selamat Pagi, 👋\n${currentUser.name}`}
        rightActions={rightActions}
      />
      
      <main className="px-4 py-4 space-y-6">
        <PFICalculator />
        
        <MarketPriceSection marketPrices={marketPrices} />

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-semibold text-primary">Trending Komoditas</h2>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-card">
            {trending.map((trend, idx) => (
              <TrendCard key={idx} commodityName={trend.name} priceChange={trend.change} trendDirection={trend.trend} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
