"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Listing } from "@/lib/types";
import Badge, { gradeToBadgeVariant } from "@/components/petani/ui/Badge";
import { getCommodityEmoji, formatShortDate, formatRupiah } from "@/lib/utils";

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

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const bidCount = listing.bidCount || 0;

  const statusVariant = useMemo(() => {
    switch (listing.status) {
      case "open":
        return "active";
      case "locked":
        return "pending";
      case "completed":
        return "done";
      case "cancelled":
        return "done"; // or whatever variant looks best for cancelled
      default:
        return "active";
    }
  }, [listing.status]);

  const statusLabel = useMemo(() => {
    switch (listing.status) {
      case "open":
        return "Aktif";
      case "locked":
        return "Terjual";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return "Aktif";
    }
  }, [listing.status]);

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-white rounded-[26px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/90 flex items-start gap-3.5 mb-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none">
        {/* Placeholder Image */}
        <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl bg-[#F8F9FA] shadow-2xs border border-gray-100/50">
          {getCommodityEmoji(listing.commodity?.name)}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-[#12241A] text-lg leading-snug truncate">
              {listing.commodity?.name || 'Komoditas'}
            </h3>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          
          <p className="text-xs font-medium text-gray-500 mb-2.5">
            {listing.volume} {listing.unit} • Panen: {formatShortDate(listing.harvestDate)}
          </p>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              {listing.grade && (
                <Badge variant={gradeToBadgeVariant(listing.grade)}>Grade {listing.grade}</Badge>
              )}
              {bidCount > 0 && (
                <span className="text-[11px] font-bold tracking-wide uppercase text-[#166534] bg-[#DCFCE7] px-3 py-1 rounded-full">
                  {bidCount} penawaran
                </span>
              )}
            </div>
            
            <p className="font-extrabold text-[#12241A]">
              {formatRupiah(listing.minPrice)}<span className="text-xs font-normal text-gray-400">/{listing.unit}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
