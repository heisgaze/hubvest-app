"use client";

import { Transaction } from "@/lib/types";
import { formatRupiah, formatShortDate } from "@/lib/utils";

interface ContractSummaryProps {
  transaction: Transaction;
}

export default function ContractSummary({ transaction }: ContractSummaryProps) {
  const totalValue = transaction.agreedPrice * transaction.volume;

  return (
    <div className="bg-white rounded-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 overflow-hidden mb-4">
      <div className="bg-[#F8F9FA] px-4 py-3 border-b border-gray-100/80 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">No. Kontrak</span>
        <span className="text-sm font-extrabold text-[#2A4736] tracking-wide">
          {transaction.contractNumber}
        </span>
      </div>
      
      <div className="p-5">
        {/* Commodity Info */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100/80 mb-4">
          <div>
            <h3 className="font-bold text-[#12241A] text-lg">
              {transaction.commodity?.name || 'Komoditas'}
            </h3>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              {transaction.volume} {transaction.unit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-500 mb-0.5">{formatRupiah(transaction.agreedPrice)}/{transaction.unit}</p>
            <p className="font-extrabold text-[#12241A] text-lg">{formatRupiah(totalValue)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100/80 mb-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Petani (Penjual)</span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2A4736]/10 text-[#2A4736] flex items-center justify-center text-xs font-bold">
                {transaction.farmer?.name?.charAt(0) || 'P'}
              </div>
              <span className="text-sm font-bold text-[#12241A] line-clamp-1">
                {transaction.farmer?.name}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Tengkulak (Pembeli)</span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold">
                {transaction.tengkulak?.name?.charAt(0) || 'T'}
              </div>
              <span className="text-sm font-bold text-[#12241A] line-clamp-1">
                {transaction.tengkulak?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-3">Jadwal & Lokasi Pengambilan</span>
          <div className="flex items-start gap-2.5 mb-2">
            <span className="text-gray-400 mt-0.5 text-sm">📅</span>
            <span className="text-sm text-[#12241A] font-bold">
              {formatShortDate(transaction.pickupDate)}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-gray-400 mt-0.5 text-sm">📍</span>
            <span className="text-sm text-[#12241A] font-medium leading-relaxed">
              {transaction.pickupLocation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
