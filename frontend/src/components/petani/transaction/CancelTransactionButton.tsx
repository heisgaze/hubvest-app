"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cancelTransaction } from "@/lib/api";

export default function CancelTransactionButton({ transactionId }: { transactionId: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Apakah Anda yakin ingin membatalkan transaksi ini?")) return;
    
    setIsPending(true);
    try {
      const res = await cancelTransaction(transactionId);
      if (res.success) {
        alert("Transaksi berhasil dibatalkan.");
        router.refresh();
      } else {
        alert("Gagal membatalkan: " + res.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 py-3.5 rounded-xl font-bold transition-colors disabled:opacity-50 mt-3"
    >
      {isPending ? "Memproses..." : "Batalkan Transaksi"}
    </button>
  );
}
