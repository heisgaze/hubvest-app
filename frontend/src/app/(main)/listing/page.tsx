"use client";

import { useState } from "react";
import HeaderBar from "@/components/ui/HeaderBar";
import ListingCard from "@/components/listing/ListingCard";
import { listings } from "@/lib/mock-data";
import Link from "next/link";

export default function ListingIndexPage() {
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Aktif" | "Negosiasi" | "Terjual">("Semua");

  const filteredListings = listings.filter((listing) => {
    if (activeFilter === "Semua") return true;
    if (activeFilter === "Aktif") return listing.status === "active";
    if (activeFilter === "Negosiasi") return listing.status === "negotiating";
    if (activeFilter === "Terjual") return listing.status === "sold";
    return true;
  });

  const filterTabs: ("Semua" | "Aktif" | "Negosiasi" | "Terjual")[] = ["Semua", "Aktif", "Negosiasi", "Terjual"];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Listing Panen" />
      
      {/* Filter Tabs */}
      <div className="px-4 py-3 bg-white sticky top-14 z-10 shadow-sm overflow-x-auto no-scrollbar flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === tab
                ? "bg-primary text-white"
                : "bg-surface-bg text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-gray-800 font-semibold mb-1">Belum ada listing</h3>
            <p className="text-gray-500 text-sm">Tidak ada listing dengan status {activeFilter}.</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <Link href="/listing/create">
        <button className="fixed bottom-20 right-4 w-14 h-14 bg-accent text-white rounded-full shadow-float flex items-center justify-center hover:scale-105 transition-transform z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
