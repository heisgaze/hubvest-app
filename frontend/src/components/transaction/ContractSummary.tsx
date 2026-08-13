"use client";

import { Transaction } from "@/lib/types";
import { formatRupiah, formatShortDate } from "@/lib/utils";

interface ContractSummaryProps {
  transaction: Transaction;
}

export default function ContractSummary({ transaction }: ContractSummaryProps) {
  const totalValue = transaction.agreedPrice * transaction.volume;

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="bg-surface-bg px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">No. Kontrak</span>
        <span className="text-sm font-bold text-primary tracking-wide">
          {transaction.contractNumber}
        </span>
      </div>
      
      <div className="p-4">
        {/* Commodity Info */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">
              {transaction.commodity?.name || 'Komoditas'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {transaction.volume} {transaction.unit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">{formatRupiah(transaction.agreedPrice)}/{transaction.unit}</p>
            <p className="font-bold text-primary text-lg">{formatRupiah(totalValue)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 mb-4">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Petani (Penjual)</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-light text-white flex items-center justify-center text-xs font-bold">
                {transaction.farmer?.name?.charAt(0) || 'P'}
              </div>
              <span className="text-sm font-medium text-gray-800 line-clamp-1">
                {transaction.farmer?.name}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Tengkulak (Pembeli)</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {transaction.tengkulak?.name?.charAt(0) || 'T'}
              </div>
              <span className="text-sm font-medium text-gray-800 line-clamp-1">
                {transaction.tengkulak?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div>
          <span className="text-xs text-gray-500 block mb-2">Jadwal & Lokasi Pengambilan</span>
          <div className="flex items-start gap-2 mb-2">
            <span className="text-gray-400 mt-0.5">📅</span>
            <span className="text-sm text-gray-700 font-medium">
              {formatShortDate(transaction.pickupDate)}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">📍</span>
            <span className="text-sm text-gray-700">
              {transaction.pickupLocation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
