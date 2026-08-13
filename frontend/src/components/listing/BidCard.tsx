"use client";

import { Bid } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

interface BidCardProps {
  bid: Bid;
}

export default function BidCard({ bid }: BidCardProps) {
  const initials = bid.tengkulak?.name
    ? bid.tengkulak.name.split(' ').map(n => n[0]).join('').substring(0, 2)
    : 'T';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 animate-slide-up">
      <div className="flex gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white font-bold flex-shrink-0">
          {initials}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-gray-800 text-sm">{bid.tengkulak?.name}</h4>
            {bid.tengkulak?.verified && (
              <span className="text-blue-500 text-xs">✓</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={bid.tengkulak?.rating || 0} size="sm" />
            <span className="text-xs text-gray-500">
              ({bid.tengkulak?.totalTransactions || 0} tr)
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-primary text-base">
            {formatRupiah(bid.price)}
          </p>
        </div>
      </div>

      <div className="bg-surface-bg rounded-xl p-3 mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          &quot;{bid.message}&quot;
        </p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2 px-4 rounded-xl border border-primary text-primary font-medium text-sm hover:bg-gray-50 transition-colors">
          Chat
        </button>
        <button className="flex-1 py-2 px-4 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-light transition-colors shadow-sm">
          Terima
        </button>
      </div>
    </div>
  );
}
