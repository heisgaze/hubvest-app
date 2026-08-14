import Link from "next/link";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import ContractSummary from "@/components/petani/transaction/ContractSummary";
import StatusTimeline from "@/components/petani/transaction/StatusTimeline";
import MarkAsPickedUpButton from "@/components/petani/transaction/MarkAsPickedUpButton";
import { fetchTransactionDetail } from "@/lib/api";

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  const transaction = await fetchTransactionDetail(id);

  if (!transaction) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Detail Transaksi" showBack />
      
      <div className="p-4 space-y-5">
        <ContractSummary transaction={transaction} />
        
        <StatusTimeline events={transaction.timeline || []} />
      </div>

      {/* Action Buttons based on status */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-10 pb-safe">
        {transaction.status === "pickup_scheduled" && (
          <MarkAsPickedUpButton transactionId={transaction.id} />
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
