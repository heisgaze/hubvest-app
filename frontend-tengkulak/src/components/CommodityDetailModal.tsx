import React from 'react';
import { X, TrendingUp, TrendingDown, MapPin, CheckCircle, Info } from 'lucide-react';
import { Commodity } from '../types';
import { CommodityIcon } from './CommodityIcon';

interface CommodityDetailModalProps {
  commodity: Commodity | null;
  onClose: () => void;
  onTawarClick?: () => void;
}

export const CommodityDetailModal: React.FC<CommodityDetailModalProps> = ({
  commodity,
  onClose,
  onTawarClick,
}) => {
  if (!commodity) return null;

  const isPositive = commodity.changePercent >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: commodity.iconBg }}
            >
              <CommodityIcon type={commodity.iconType} size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#12241A]">{commodity.name}</h2>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                {commodity.qualityGrade}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Price Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Rata-Rata Harga Saat Ini
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-extrabold text-[#12241A]">
                Rp {commodity.price.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-medium text-gray-500">/{commodity.unit}</span>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${
              isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? `+${commodity.changePercent}%` : `${commodity.changePercent}%`}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Deskripsi Komoditas
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {commodity.description}
          </p>
        </div>

        {/* Market Price Distribution List */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" /> Harga di Berbagai Pasar Induk
          </h4>

          <div className="space-y-2">
            {commodity.marketPrices.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm"
              >
                <div>
                  <span className="font-semibold text-[#12241A] block">{m.location}</span>
                  <span className="text-[11px] text-gray-400">{m.updatedAt}</span>
                </div>
                <span className="font-bold text-[#12241A]">
                  Rp {m.price.toLocaleString('id-ID')} <span className="text-xs text-gray-500 font-normal">/kg</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-gray-200 font-bold text-gray-700 text-sm hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
          {onTawarClick && (
            <button
              onClick={() => {
                onClose();
                onTawarClick();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#2A4736] hover:bg-[#1f3629] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Cari Penjual
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
