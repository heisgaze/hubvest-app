import React from "react";
import { fetchMarketPrices } from "@/lib/api";
import DashboardInteractive from "@/components/petani/dashboard/DashboardInteractive";
import TrendCard from "@/components/petani/dashboard/TrendCard";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import { getRoleCookie } from "@/app/actions";
import TengkulakApp from "@/components/tengkulak/TengkulakApp";

// Removed mock data, using empty fallbacks for build
const currentUser = { id: "", name: "Pengguna", role: "farmer", avatar: "", location: "", rating: 0, totalTransactions: 0, joinedDate: "", verified: false };
const users: any[] = [];
const commodities: any[] = [];
const marketPrices: any[] = [];
const listings: any[] = [];
const bids: any[] = [];
const transactions: any[] = [];
const reviews: any[] = [];
const chatPreviews: any[] = [];
const chatMessages: any = {};

export default async function DashboardPage() {
  const roleId = await getRoleCookie();
  const isTengkulak = roleId === "t1";

  if (isTengkulak) {
    return <TengkulakApp />;
  }

  const marketPrices = await fetchMarketPrices();
  
  const trending: any[] = [];

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
        <DashboardInteractive initialMarketPrices={marketPrices} />

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
