"use client";
import React, { useState, useEffect } from "react";
import { fetchTransactionDetail, completeTransaction } from "@/lib/api";
import Link from "next/link";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import ContractSummary from "@/components/petani/transaction/ContractSummary";
import StatusTimeline from "@/components/petani/transaction/StatusTimeline";
import MarkAsPickedUpButton from "@/components/petani/transaction/MarkAsPickedUpButton";
import CancelTransactionButton from "@/components/petani/transaction/CancelTransactionButton";
import { fetchTransactionDetail } from "@/lib/api";
import { Transaction } from "@/lib/types";

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactionDetail(params.id);
        setTransaction(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeaderBar title="Memuat..." showBack />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeaderBar title="Tidak Ditemukan" showBack />
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Data transaksi tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Detail Transaksi" showBack />
      
      <div className="p-4 space-y-5">
        <ContractSummary transaction={transaction} />
        
        <StatusTimeline events={transaction.timeline || []} />
      </div>

      {/* Action Buttons based on status */}
      <div className="mt-8 px-4 pb-8">
        {(transaction.status === "pickup_scheduled" || transaction.status === "waiting_pickup") && (
          <div className="space-y-3">
            <MarkAsPickedUpButton transactionId={transaction.id} />
            <CancelTransactionButton transactionId={transaction.id} />
          </div>
        )}
        
        {transaction.status === "completed" && (
          <Link href={`/transaction/${transaction.id}/rate`}>
            <button className="w-full bg-white border-2 border-primary text-primary hover:bg-gray-50 py-3.5 rounded-xl font-bold transition-colors mt-4">
              Beri Penilaian
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
