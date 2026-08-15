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
      <div className="card card-hover flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card transition-all mb-4">
        {/* Image / Placeholder */}
        {listing.images && listing.images.length > 0 ? (
          <div 
            className="w-20 h-20 rounded-xl flex-shrink-0 bg-cover bg-center border border-gray-100" 
            style={{ backgroundImage: `url(${listing.images[0]})` }}
          />
        ) : (
          <div className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl" style={{ backgroundColor: '#F0F7F4' }}>
            {getCommodityEmoji(listing.commodity?.name)}
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-800 line-clamp-1">
              {listing.commodity?.name || 'Komoditas'}
            </h3>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">
            {listing.volume} {listing.unit} • Panen: {formatShortDate(listing.harvestDate)}
          </p>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              {listing.grade && (
                <Badge variant={gradeToBadgeVariant(listing.grade)}>Grade {listing.grade}</Badge>
              )}
              {bidCount > 0 && (
                <span className="text-xs font-medium text-accent bg-green-50 px-2 py-1 rounded-full">
                  {bidCount} penawaran
                </span>
              )}
            </div>
            
            <p className="font-bold text-primary">
              {formatRupiah(listing.minPrice)}<span className="text-xs font-normal text-gray-500">/{listing.unit}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
