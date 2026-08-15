import React from 'react';
import { FarmerListing } from "@/components/tengkulak/types";
import { MapPin, Star, TrendingUp } from 'lucide-react';

interface FarmerCardProps {
  farmer: FarmerListing;
  variant?: 'compact' | 'full';
  onClick?: () => void;
  onTawarClick?: (e: React.MouseEvent) => void;
}

export const FarmerCard: React.FC<FarmerCardProps> = ({
  farmer,
  variant = 'compact',
  onClick,
  onTawarClick,
}) => {
  if (variant === 'compact') {
    const isYellowBadge = farmer.buyersCount >= 50;

    return (
      <div
        onClick={onClick}
        className="bg-white rounded-[26px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 select-none"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Square crop photo thumbnail */}
            <img
              src={farmer.farmerPhoto || farmer.commodityPhoto}
              alt={farmer.farmerName}
              className="w-14 h-14 rounded-2xl object-cover bg-gray-100 shrink-0 shadow-2xs"
            />

            {/* Farmer Info */}
            <div className="min-w-0">
              <h3 className="font-bold text-[#12241A] text-lg leading-snug truncate">
                {farmer.farmerName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-0.5">
                <span>{farmer.amount} {farmer.unit}</span>
                <span className="text-gray-300">•</span>
                <span>{farmer.date}</span>
              </div>
            </div>
          </div>

          {/* Buyers Badge */}
          <div
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shrink-0 ${
              isYellowBadge
                ? 'bg-[#FEF3C7] text-[#92400E]'
                : 'bg-[#DCFCE7] text-[#166534]'
            }`}
          >
            {farmer.buyersCount} PEMBELI
          </div>
        </div>

        {/* Highest Offer Highlight row if present */}
        {farmer.highestOfferPrice && (
          <div className="mt-3 pt-2.5 border-t border-gray-100/80 flex items-center gap-1.5 text-xs font-semibold text-[#16803D]">
            <TrendingUp className="w-3.5 h-3.5 text-[#16803D] shrink-0" />
            <span>
              Penawaran tertinggi: <strong className="font-bold text-[#12241A]">Rp {farmer.highestOfferPrice.toLocaleString('id-ID')}/kg</strong>
            </span>
          </div>
        )}
      </div>
    );
  }

  /* Full Hero Variant for Market View */
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Top Hero Commodity Photo */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={
            farmer.commodityPhoto ||
            'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&q=80&w=800'
          }
          alt={farmer.commodityName}
          className="w-full h-full object-cover"
        />

        {/* Top-Left Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-black text-slate-900 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 stroke-none" />
          <span>{farmer.rating ? farmer.rating.toFixed(1) : '4.8'}</span>
        </div>

        {/* Bottom-Right Quantity Badge */}
        <div className="absolute bottom-3 right-3 bg-[#1B3828]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs">
          {farmer.amount} {farmer.unit}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 space-y-2.5">
        {/* Commodity Name, Farmer & Location & Harvest Date Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-[#12241A] text-lg leading-snug">
              {farmer.commodityName}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium mt-0.5">
              <span className="font-semibold text-gray-700">{farmer.farmerName}</span>
              <span className="text-gray-300">•</span>
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{farmer.location}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
              MULAI PANEN
            </div>
            <div className="text-xs font-black text-[#12241A] mt-0.5">
              {farmer.harvestStartDate || farmer.date || '15 Okt 2023'}
            </div>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="border-t border-gray-100/90 my-1" />

        {/* Estimasi Harga & Penawaran Button Row */}
        <div className="flex items-center justify-between pt-0.5">
          <div>
            <div className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
              ESTIMASI HARGA
            </div>
            <div className="text-base font-extrabold text-[#12241A] mt-0.5">
              Rp {(farmer.estimatedPrice || 18500).toLocaleString('id-ID')}
              <span className="text-xs font-normal text-gray-400">/kg</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onTawarClick) onTawarClick(e);
              else if (onClick) onClick();
            }}
            className="bg-[#2A4736] hover:bg-[#1f3729] active:scale-95 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-2xs"
          >
            Penawaran
          </button>
        </div>
      </div>
    </div>
  );
};


