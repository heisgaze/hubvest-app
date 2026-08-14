"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeTransaction } from "@/lib/api";

interface Props {
  transactionId: string;
}

export default function MarkAsPickedUpButton({ transactionId }: Props) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    if (!confirm("Apakah Anda yakin Tengkulak sudah mengambil komoditas Anda?")) return;
    
    setIsConfirming(true);
    try {
      const res = await completeTransaction(transactionId);

      if (!res.success) {
        throw new Error(res.message);
      }

      alert("Transaksi berhasil diselesaikan!");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan saat mengonfirmasi.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <button 
      onClick={handleConfirm}
      disabled={isConfirming}
      className="w-full btn-primary py-3.5 rounded-xl font-bold disabled:opacity-50"
    >
      {isConfirming ? "Memproses..." : "Tandai Sudah Diambil"}
    </button>
  );
}
