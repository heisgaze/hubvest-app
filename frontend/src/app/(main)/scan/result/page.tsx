import React from "react";
import Link from "next/link";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import GradeResultCard from "@/components/petani/scan/GradeResultCard";
import { analyzeCV } from "@/lib/api";

export default async function ScanResultPage() {
  const result = await analyzeCV();

  return (
    <div className="bg-surface-bg">
      <HeaderBar title="Hasil Scan" showBack={true} />
      
      <main className="px-4 py-2">
        {result ? (
          <GradeResultCard result={result} />
        ) : (
          <div className="text-center py-10 text-red-500">Gagal menganalisis gambar.</div>
        )}
        
        <div className="mt-8 flex flex-col gap-3">
          <Link href={`/listing/create?grade=${result?.grade || 'B'}&commodity=${encodeURIComponent(result?.commodityName || '')}`} className="block w-full">
            <button className="w-full btn-primary text-sm shadow-md py-3.5">
              Simpan Sertifikat & Buat Listing Baru
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
