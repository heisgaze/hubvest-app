import React, { useState } from 'react';
import { Commodity, FarmerListing } from '../types';
import { Search } from 'lucide-react';
import { FarmerCard } from './FarmerCard';

interface MarketViewProps {
  farmerListings?: FarmerListing[];
  commodities?: Commodity[];
  onCommoditySelect?: (c: Commodity) => void;
  onFarmerClick?: (f: FarmerListing) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  farmerListings = [],
  onFarmerClick,
}) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Terdekat');

  const filterOptions = ['Terdekat', 'Baru Panen', 'Harga Rendah'];

  const filteredListings = farmerListings.filter((f) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      f.farmerName.toLowerCase().includes(searchLower) ||
      f.commodityName.toLowerCase().includes(searchLower) ||
      f.location.toLowerCase().includes(searchLower);

    return matchesSearch;
  });

  // Sort based on active filter
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (activeFilter === 'Harga Rendah') {
      return (a.estimatedPrice || 0) - (b.estimatedPrice || 0);
    }
    // Default Terdekat / Baru Panen
    return 0;
  });

  return (
    <div className="px-5 pt-3 pb-28 space-y-4 animate-in fade-in duration-200">
      {/* Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari komoditas atau petani..."
          className="w-full bg-[#EFEFEF] border border-transparent rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-[#12241A] placeholder-gray-400 focus:outline-hidden focus:bg-white focus:border-emerald-600 transition-all shadow-2xs"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Filter Options Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#2A4736] text-white shadow-2xs'
                  : 'bg-[#E3E7E4] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Section Header: Pasar Langsung - Panen Tersedia */}
      <div className="pt-2">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-xs font-medium text-gray-400 block">
              Pasar Langsung
            </span>
            <h2 className="text-xl font-extrabold text-[#12241A] tracking-tight">
              Panen Tersedia
            </h2>
          </div>

          <button className="text-xs font-bold text-[#2A4736] hover:underline">
            Lihat Semua
          </button>
        </div>

        {/* Harvest Cards Stack */}
        <div className="space-y-4">
          {sortedListings.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              variant="full"
              onClick={() => onFarmerClick && onFarmerClick(farmer)}
              onTawarClick={() => onFarmerClick && onFarmerClick(farmer)}
            />
          ))}

          {sortedListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 px-4">
              <p className="text-sm font-semibold text-gray-500">
                Tidak ada panen yang cocok dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

