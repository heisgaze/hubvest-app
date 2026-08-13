"use client";

import { useState } from "react";
import HeaderBar from "@/components/ui/HeaderBar";
import { commodities, currentUser } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function CreateListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      router.push("/listing");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <HeaderBar title="Buat Listing Baru" showBack />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Photo Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-white p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors h-40">
          <div className="w-12 h-12 rounded-full bg-surface-bg flex items-center justify-center text-primary mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-medium text-gray-600">Tambah Foto</span>
          <span className="text-xs text-gray-400">Atau ambil dari hasil scan AI</span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Komoditas</label>
            <select className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none" required>
              <option value="">Pilih Komoditas...</option>
              {commodities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume</label>
              <input type="number" placeholder="Contoh: 500" className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required min="1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Satuan</label>
              <select className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option value="kg">Kilogram (kg)</option>
                <option value="ton">Ton</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Panen</label>
            <input type="date" className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lokasi Pengambilan</label>
            <input type="text" defaultValue={currentUser.location} className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Minimum (Rp / Satuan)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">Rp</span>
              </div>
              <input type="number" placeholder="0" className="w-full bg-white rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required min="100" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Tambahan</label>
            <textarea placeholder="Contoh: Kualitas super, hasil panen baru..." rows={3} className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"></textarea>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3.5 rounded-xl font-bold mt-4">
          {isSubmitting ? 'Menyimpan...' : 'Buat Listing'}
        </button>
      </form>
    </div>
  );
}
