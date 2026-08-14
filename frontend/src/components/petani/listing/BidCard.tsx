"use client";

import { Bid } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import StarRating from "@/components/petani/ui/StarRating";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptBid, rejectBid } from "@/lib/api";

interface BidCardProps {
  bid: Bid;
}

export default function BidCard({ bid }: BidCardProps) {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleAcceptBid = async () => {
    if (!confirm(`Terima tawaran ${formatRupiah(bid.price)} dari ${bid.tengkulak?.name}?`)) return;
    
    setIsAccepting(true);
    try {
      const res = await acceptBid(bid.id);
      
      if (!res.success) {
        throw new Error(res.message);
      }

      alert("Tawaran diterima! Digital Handshake berhasil dibuat.");
      router.push(`/transaction/${res.transaction_id}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan saat menerima tawaran.");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleRejectBid = async () => {
    if (!confirm(`Tolak tawaran ${formatRupiah(bid.price)} dari ${bid.tengkulak?.name}?`)) return;
    
    setIsRejecting(true);
    try {
      const res = await rejectBid(bid.id);
      
      if (!res.success) {
        throw new Error(res.message);
      }

      setIsHidden(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan saat menolak tawaran.");
    } finally {
      setIsRejecting(false);
    }
  };

  const initials = bid.tengkulak?.name
    ? bid.tengkulak.name.split(' ').map(n => n[0]).join('').substring(0, 2)
    : 'T';

  if (isHidden) return null;

  return (
    <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 mb-3 animate-slide-up">
      <div className="flex gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white font-bold flex-shrink-0">
          {initials}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-[#12241A] text-base">{bid.tengkulak?.name}</h4>
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
          <p className="font-extrabold text-[#12241A] text-lg">
            {formatRupiah(bid.price)}
          </p>
        </div>
      </div>

      <div className="bg-[#F8F9FA] border border-gray-100/80 rounded-[20px] p-4 mb-4">
        <p className="text-sm text-gray-500 font-medium line-clamp-2">
          &quot;{bid.message}&quot;
        </p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleRejectBid}
          disabled={isRejecting || isAccepting}
          className="flex-1 py-2.5 px-4 rounded-full border border-red-500 text-red-500 font-bold text-xs hover:bg-red-50 transition-colors disabled:opacity-50 active:scale-95"
        >
          {isRejecting ? "Memproses..." : "Tolak"}
        </button>
        <button 
          onClick={handleAcceptBid}
          disabled={isAccepting || isRejecting}
          className="flex-1 py-2.5 px-4 rounded-full bg-[#2A4736] hover:bg-[#1f3729] text-white font-bold text-xs transition-colors shadow-2xs disabled:opacity-50 active:scale-95"
        >
          {isAccepting ? "Memproses..." : "Terima"}
        </button>
      </div>
    </div>
  );
}
