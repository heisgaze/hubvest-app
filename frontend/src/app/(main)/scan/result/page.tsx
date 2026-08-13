import React from "react";
import Link from "next/link";
import HeaderBar from "@/components/ui/HeaderBar";
import GradeResultCard from "@/components/scan/GradeResultCard";
import { analyzeCV } from "@/lib/api";

export default async function ScanResultPage() {
  const result = await analyzeCV();

  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      <HeaderBar title="Hasil Scan" showBack={true} />
      
      <main className="px-4 py-2">
        {result ? (
          <GradeResultCard result={result} />
        ) : (
          <div className="text-center py-10 text-red-500">Gagal menganalisis gambar.</div>
        )}
        
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/listing/create">
            <button className="w-full btn-primary">
              Simpan ke Listing
            </button>
          </Link>
          <Link href="/scan">
            <button className="w-full btn-secondary">
              Scan Ulang
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
