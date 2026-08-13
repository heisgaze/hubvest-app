"use client";

import { useState } from "react";
import ListingCard from "@/components/listing/ListingCard";
import Link from "next/link";
import { Listing } from "@/lib/types";

export default function ListingView({ initialListings }: { initialListings: Listing[] }) {
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Aktif" | "Negosiasi" | "Terjual">("Semua");

  const filteredListings = initialListings.filter((listing: Listing) => {
    if (activeFilter === "Semua") return true;
    if (activeFilter === "Aktif") return listing.status === "active";
    if (activeFilter === "Negosiasi") return listing.status === "negotiating";
    if (activeFilter === "Terjual") return listing.status === "sold";
    return true;
  });

  return (
    <>
      {/* Tabs */}
      <div className="sticky top-[60px] z-30 bg-white/90 backdrop-blur-md px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto hide-scrollbar">
        {["Semua", "Aktif", "Negosiasi", "Terjual"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as "Semua" | "Aktif" | "Negosiasi" | "Terjual")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="p-4 space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing: Listing) => (
            <Link href={`/listing/${listing.id}`} key={listing.id} className="block">
              <ListingCard listing={listing} />
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Tidak ada listing {activeFilter.toLowerCase()}</p>
          </div>
        )}
      </main>
    </>
  );
}
