"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import { createListing } from "@/lib/api";

// Removed mock data, using empty fallbacks for build
const currentUser = { id: "", name: "Pengguna", role: "farmer", avatar: "", location: "", rating: 0, totalTransactions: 0, joinedDate: "", verified: false };
const commodities = [
  { id: "c1", name: "Bawang Merah", price: 25000 },
  { id: "c2", name: "Cabai Rawit Merah", price: 45000 },
  { id: "c3", name: "Beras Medium", price: 14000 },
  { id: "c4", name: "Tomat", price: 8500 },
  { id: "c5", name: "Kentang Dieng", price: 15000 },
];

import { useState, useEffect } from "react";

export default function CreateListingPage({ searchParams }: { searchParams: { grade?: string, commodity?: string } }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const defaultCommodityId = searchParams.commodity 
    ? commodities.find(c => c.name.toLowerCase() === searchParams.commodity?.toLowerCase())?.id || ""
    : "";
    
  const [selectedCommodity, setSelectedCommodity] = useState<string>(defaultCommodityId);
  const selectedPrice = commodities.find(c => c.id === selectedCommodity)?.price || "";
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const scannedImage = sessionStorage.getItem("scannedImage");
    if (scannedImage) {
      setImagePreview(scannedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        if (!formData.get("commodity")) {
          alert("Silakan pilih komoditas terlebih dahulu.");
          return;
        }

        const payload = {
          seller_id: "u1", // Always petani
          commodity_id: formData.get("commodity"),
          title: formData.get("title") || "Panen Baru",
          quantity: parseFloat(formData.get("quantity") as string),
          unit: formData.get("unit"),
          price: parseFloat(formData.get("price") as string),
          location: formData.get("location"),
          grade: formData.get("grade") as string || "B",
          description: formData.get("description"),
          image_url: imagePreview || undefined,
        };

        const res = await createListing(payload);
        if (res.success) {
          sessionStorage.removeItem("scannedImage");
          router.push("/listing");
        } else {
          alert(res.message || "Gagal membuat listing");
        }
      } catch (e) {
        console.error(e);
        alert("Terjadi kesalahan sistem");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <HeaderBar title="Buat Listing Baru" showBack />
      
      <form action={formAction} className="p-4 space-y-6">
        {/* Photo Upload Area */}
        <label className="border-2 border-dashed border-gray-300 rounded-2xl bg-white p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors h-40 relative overflow-hidden">
          <input type="file" className="hidden" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-surface-bg flex items-center justify-center text-primary mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-600">Tambah Foto</span>
              <span className="text-xs text-gray-400">Atau ambil dari hasil scan AI</span>
            </>
          )}
        </label>

        {/* Form Fields */}
        <div className="space-y-4">
          <input type="hidden" name="grade" value={searchParams.grade || 'B'} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Komoditas</label>
            {searchParams.commodity ? (
              <input type="hidden" name="commodity" value={selectedCommodity} />
            ) : null}
            <select 
              name={searchParams.commodity ? "_commodity_disabled" : "commodity"} 
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed" 
              required
              disabled={!!searchParams.commodity}
            >
              <option value="">Pilih Komoditas...</option>
              {commodities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume</label>
              <input name="quantity" type="number" placeholder="Contoh: 500" className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required min="1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Satuan</label>
              <select name="unit" className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
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
            <input name="location" type="text" defaultValue={currentUser.location} className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Referensi (Rp / Satuan)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">Rp</span>
              </div>
              <input 
                name="price" 
                type="number" 
                value={selectedPrice} 
                readOnly
                className="w-full bg-gray-100 rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-gray-600 focus:outline-none cursor-not-allowed" 
                required 
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">*Harga dikunci berdasarkan referensi pasar real-time</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Tambahan</label>
            <textarea name="description" placeholder="Contoh: Kualitas super, hasil panen baru..." rows={3} className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"></textarea>
          </div>
        </div>

        <button type="submit" disabled={isPending} className="w-full btn-primary py-3.5 rounded-xl font-bold mt-4">
          {isPending ? 'Menyimpan...' : 'Buat Listing'}
        </button>
      </form>
    </div>
  );
}
