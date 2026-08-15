import React from "react";
export const dynamic = "force-dynamic";
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

  const trending: any[] = [
    { name: "Bawang Merah", change: 2.5, trend: "up" },
    { name: "Cabai Rawit Merah", change: 5.0, trend: "up" },
    { name: "Beras Medium", change: -1.2, trend: "down" },
    { name: "Kentang Dieng", change: 0, trend: "stable" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <HeaderBar />
      
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
