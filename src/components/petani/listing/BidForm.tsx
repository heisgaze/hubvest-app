"use client";

import { useState, useTransition } from "react";
import { submitBidAction } from "@/app/actions";

export default function BidForm({ listingId, minPrice }: { listingId: string, minPrice: number }) {
  const [amount, setAmount] = useState(minPrice);
  const [isPending, startTransition] = useTransition();

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await submitBidAction(listingId, amount);
        setAmount(minPrice);
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-40">
      <form onSubmit={handleBid} className="flex gap-2">
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={minPrice}
          className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
        <button 
          type="submit" 
          disabled={isPending}
          className="btn-primary py-3 px-6 rounded-xl font-bold whitespace-nowrap"
        >
          {isPending ? 'Mengirim...' : 'Tawar'}
        </button>
      </form>
    </div>
  );
}
