"use client";

import Link from "next/link";
import { Listing } from "@/lib/types";
import { formatRupiah, formatShortDate, getCommodityEmoji } from "@/lib/utils";
import Badge, { gradeToBadgeVariant } from "@/components/ui/Badge";
import { useMemo } from "react";
import { bids } from "@/lib/mock-data";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const bidCount = useMemo(() => {
    return bids.filter((b) => b.listingId === listing.id).length;
  }, [listing.id]);

  const statusVariant = useMemo(() => {
    switch (listing.status) {
      case "active":
        return "active";
      case "negotiating":
        return "pending";
      case "sold":
        return "done";
      default:
        return "active";
    }
  }, [listing.status]);

  const statusLabel = useMemo(() => {
    switch (listing.status) {
      case "active":
        return "Aktif";
      case "negotiating":
        return "Negosiasi";
      case "sold":
        return "Terjual";
      default:
        return "Aktif";
    }
  }, [listing.status]);

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="card card-hover flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card transition-all mb-4">
        {/* Placeholder Image */}
        <div className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl" style={{ backgroundColor: '#F0F7F4' }}>
          {getCommodityEmoji(listing.commodity?.name)}
        </div>

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
