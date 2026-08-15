"use client";

import React, { useState, useEffect } from "react";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import { fetchIncomingBids } from "@/lib/api";
import Link from "next/link";
import BidCard from "@/components/petani/listing/BidCard";
import { Bid } from "@/lib/types";

export default function TransactionsPage() {
  const [incomingBids, setIncomingBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const bids = await fetchIncomingBids();
        setIncomingBids(bids);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      <HeaderBar title="Tawaran Masuk" showBack />
      
      <main className="px-4 py-4 space-y-4">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat data...</div>
        ) : incomingBids.length > 0 ? (
          incomingBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center animate-slide-up mt-6">
            <div className="w-16 h-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📥
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Belum ada tawaran</h2>
            <p className="text-sm text-gray-500 mb-6">
              Saat ini belum ada tengkulak yang memberikan penawaran pada listing panen Anda.
            </p>
            <Link href="/listing">
              <button className="btn-primary w-full">
                Lihat Daftar Listing Saya
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
