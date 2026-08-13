import React from 'react';
import { Commodity } from '../types';
import { CommodityIcon } from './CommodityIcon';

interface MarketPriceCardProps {
  commodity: Commodity;
  onClick?: () => void;
}

export const MarketPriceCard: React.FC<MarketPriceCardProps> = ({ commodity, onClick }) => {
  const isPositive = commodity.changePercent >= 0;

  // Format currency: 28500 -> "28.500"
  const formattedPrice = commodity.price.toLocaleString('id-ID');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[26px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/80 min-w-[210px] max-w-[230px] flex-shrink-0 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 select-none relative overflow-hidden"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Icon Circle */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: commodity.iconBg }}
          >
            <CommodityIcon type={commodity.iconType} size={22} />
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#12241A] text-[15px] leading-tight whitespace-pre-line">
            {commodity.name}
          </h3>
        </div>

        {/* Change Badge */}
        <div
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5 flex-shrink-0 ${
            isPositive
              ? 'bg-[#E1F7EC] text-[#16803D]'
              : 'bg-[#FEE2E2] text-[#DC2626]'
          }`}
        >
          {isPositive ? `+${commodity.changePercent}%` : `${commodity.changePercent}%`}
        </div>
      </div>

      {/* Label */}
      <div className="mt-4">
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block">
          RATA-RATA HARGA
        </span>

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-2xl font-bold text-[#12241A] tracking-tight">
            Rp {formattedPrice}
          </span>
          <span className="text-xs text-gray-500 font-medium">/{commodity.unit}</span>
        </div>
      </div>

      {/* Sparkline Graph */}
      <div className="mt-4 pt-1 h-10 w-full flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
          {isPositive ? (
            /* Smooth green rising wave matching screenshot */
            <path
              d="M 0 25 C 20 25, 30 28, 50 20 C 70 12, 80 18, 100 8"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ) : (
            /* Smooth red declining wave matching screenshot */
            <path
              d="M 0 10 C 25 10, 50 12, 75 22 C 85 26, 95 28, 100 28"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
