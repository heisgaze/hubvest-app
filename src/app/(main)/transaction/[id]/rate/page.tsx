"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HeaderBar from '@/components/petani/ui/HeaderBar';
import StarRating from '@/components/petani/ui/StarRating';

import { fetchTransactionDetail, submitReview } from '@/lib/api';
import { Transaction } from '@/lib/types';


export default function RatingPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  React.useEffect(() => {
    fetchTransactionDetail(id).then(setTransaction);
  }, [id]);

  const partner = transaction?.tengkulak; // Assuming current user is farmer

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !transaction || !partner) return;
    
    setIsSubmitting(true);
    
    const res = await submitReview(
      transaction.id, 
      partner.id, // Petani submitting review for Tengkulak
      rating, 
      comment, 
      "u1" // Petani User ID
    );
    
    setIsSubmitting(false);
    
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/transaction"); // Go back to transactions list
      }, 1500);
    } else {
      alert("Gagal mengirim ulasan: " + res.message);
    }
  };

  if (!transaction || !partner) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Penilaian Terkirim!</h2>
        <p className="text-gray-500">Terima kasih telah memberikan ulasan. Ini akan membantu komunitas Hubvest.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Beri Penilaian" showBack />
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 animate-slide-up">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Bagaimana pengalaman Anda?</h2>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-3 shadow-md">
              {partner.name.charAt(0)}
            </div>
            <h3 className="font-semibold text-gray-800">{partner.name}</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1">Tengkulak</span>
          </div>

          <div className="flex flex-col items-center mb-8 space-y-4">
            <StarRating 
              rating={rating} 
              size="lg" 
              interactive 
              onChange={setRating} 
            />
            <p className="text-sm font-medium text-gray-500">
              {rating === 0 ? "Pilih bintang untuk menilai" : 
               rating === 1 ? "Sangat Buruk" : 
               rating === 2 ? "Buruk" : 
               rating === 3 ? "Cukup" : 
               rating === 4 ? "Baik" : "Sangat Baik"}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tulis Ulasan (Opsional)</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda bertransaksi dengan pembeli ini..." 
              rows={4} 
              className="w-full bg-surface-bg rounded-xl border-none px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">Ringkasan Transaksi</p>
            <p className="text-sm font-semibold text-gray-800">
              {transaction.commodity?.name} • {transaction.volume} {transaction.unit}
            </p>
          </div>

          <button 
            type="submit" 
            disabled={rating === 0 || isSubmitting} 
            className={`w-full py-3.5 rounded-xl font-bold transition-all ${
              rating === 0 || isSubmitting 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : "btn-primary shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Penilaian'}
          </button>
        </form>
      </div>
    </div>
  );
}
