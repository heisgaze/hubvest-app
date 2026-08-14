import React from "react";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import { fetchListings } from "@/lib/api";
import Link from "next/link";
import BidCard from "@/components/petani/listing/BidCard";

export default async function TransactionsPage() {
  // For Petani, we fetch all their listings, then display the bids.
  // In a real app we'd fetch /bids/me, but since we don't have that endpoint easily available, 
  // we'll fetch listings and show a placeholder or link to listings.
  // Wait, we can fetch all listings and their bids by calling fetchListing for each? That's too heavy.
  // Let's just create a static view that says "Pilih Listing Anda di menu Listing untuk melihat Tawaran Masuk"
  // OR we can make a beautiful empty state with a link to /listing.
  
  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      <HeaderBar title="Tawaran Masuk" showBack />
      
      <main className="px-4 py-4 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center animate-slide-up">
          <div className="w-16 h-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📥
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Pantau Tawaran di Listing</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tawaran masuk dikelompokkan berdasarkan listing panen Anda. Silakan buka menu Listing dan pilih panen Anda untuk melihat dan menerima tawaran.
          </p>
          <Link href="/listing">
            <button className="btn-primary">
              Lihat Daftar Listing Saya
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
