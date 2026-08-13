"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/ui/HeaderBar";
import GradeResultCard from "@/components/scan/GradeResultCard";
import { mockScanResult } from "@/lib/mock-data";

export default function ScanResultPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      <HeaderBar title="Hasil Scan" showBack={true} />
      
      <main className="px-4 py-2">
        <GradeResultCard result={mockScanResult} />
        
        <div className="mt-8 flex flex-col gap-3">
          <button 
            className="btn-primary"
            onClick={() => router.push("/listing/create")}
          >
            Simpan ke Listing
          </button>
          <button 
            className="btn-secondary"
            onClick={() => router.back()}
          >
            Scan Ulang
          </button>
        </div>
      </main>
    </div>
  );
}
