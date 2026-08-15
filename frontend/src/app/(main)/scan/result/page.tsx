"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import GradeResultCard from "@/components/petani/scan/GradeResultCard";
import { analyzeCV } from "@/lib/api";
import { GradeResult } from "@/lib/types";

// Helper to convert dataURL to Blob
function dataURLtoBlob(dataurl: string) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

export default function ScanResultPage() {
  const [result, setResult] = useState<GradeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        const storedImage = sessionStorage.getItem("scannedImage");
        let blob: Blob | undefined;
        
        if (storedImage) {
          setImageUrl(storedImage);
          blob = dataURLtoBlob(storedImage);
        }
        
        const res = await analyzeCV(blob);
        setResult(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    processImage();
  }, []);

  return (
    <div className="bg-surface-bg min-h-screen">
      <HeaderBar title="Hasil Scan" showBack={true} />
      
      <main className="px-4 py-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Sedang menganalisis komoditas...</p>
          </div>
        ) : result ? (
          <>
            {/* Show captured image if available, else show the dummy one */}
            {imageUrl && (
              <div className="mb-4 rounded-xl overflow-hidden shadow-sm">
                <img src={imageUrl} alt="Captured" className="w-full h-48 object-cover" />
              </div>
            )}
            <GradeResultCard result={{...result, imageUrl: imageUrl || result.imageUrl}} />
          </>
        ) : (
          <div className="text-center py-10 text-red-500">Gagal menganalisis gambar.</div>
        )}
        
        {!loading && (
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
        )}
      </main>
    </div>
  );
}
