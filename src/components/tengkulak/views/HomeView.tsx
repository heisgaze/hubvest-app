import React from 'react';
import { Commodity, FarmerListing } from "@/components/tengkulak/types";
import { MarketPriceCard } from "@/components/tengkulak/cards/MarketPriceCard";
import { FarmerCard } from "@/components/tengkulak/cards/FarmerCard";
import { TrendingUp, Plus, ClipboardList, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  commodities: Commodity[];
  farmerListings: FarmerListing[];
  onLihatSemuaClick: () => void;
  onCommodityClick: (c: Commodity) => void;
  onFarmerClick: (f: FarmerListing) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  commodities,
  farmerListings,
  onLihatSemuaClick,
  onCommodityClick,
  onFarmerClick,
}) => {
  return (
    <div className="pt-2 pb-28 space-y-6 animate-in fade-in duration-200 relative">
      {/* SECTION 1: UPDATE REAL-TIME - HARGA PASAR HARI INI */}
      <section className="space-y-3">
        {/* Section Header */}
        <div className="px-5 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase block">
              UPDATE REAL-TIME
            </span>
            <h2 className="text-xl font-bold text-[#12241A] tracking-tight">
              Harga Pasar Hari Ini
            </h2>
          </div>

          <button
            onClick={onLihatSemuaClick}
            className="text-sm font-semibold text-[#16803D] hover:text-emerald-900 transition-colors flex items-center gap-0.5 pb-0.5"
          >
            Lihat Semua
          </button>
        </div>

        {/* Horizontal Scroll Cards Row */}
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar px-5 py-1">
          {commodities.map((item) => (
            <MarketPriceCard
              key={item.id}
              commodity={item}
              onClick={() => onCommodityClick(item)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: PETANI TERDEKAT - DI SEKITARMU */}
      <section className="space-y-3 px-5">
        {/* Section Header */}
        <div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase block">
            PETANI TERDEKAT
          </span>
          <h2 className="text-xl font-bold text-[#12241A] tracking-tight">
            Di sekitarmu
          </h2>
        </div>

        {/* Farmer Listings Stack */}
        <div className="space-y-3">
          {farmerListings.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              variant="compact"
              onClick={() => onFarmerClick(farmer)}
              onTawarClick={() => onFarmerClick(farmer)}
            />
          ))}
        </div>
      </section>


    </div>
  );
};
