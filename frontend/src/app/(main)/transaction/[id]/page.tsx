"use client";

import { useParams } from "next/navigation";
import HeaderBar from "@/components/ui/HeaderBar";
import ContractSummary from "@/components/transaction/ContractSummary";
import StatusTimeline from "@/components/transaction/StatusTimeline";
import { transactions } from "@/lib/mock-data";
import Link from "next/link";

export default function TransactionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const transaction = transactions.find((t) => t.id === id) || transactions[0];

  if (!transaction) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Detail Transaksi" showBack />
      
      <div className="p-4 space-y-5">
        <ContractSummary transaction={transaction} />
        
        <StatusTimeline events={transaction.timeline || []} />
      </div>

      {/* Action Buttons based on status */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-10">
        {transaction.status === "pickup_scheduled" && (
          <button className="w-full btn-primary py-3.5 rounded-xl font-bold">
            Konfirmasi Pengambilan
          </button>
        )}
        
        {transaction.status === "completed" && (
          <Link href={`/transaction/${transaction.id}/rate`}>
            <button className="w-full bg-white border-2 border-primary text-primary hover:bg-gray-50 py-3.5 rounded-xl font-bold transition-colors">
              Beri Penilaian
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
