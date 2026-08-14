import React, { useState } from 'react';
import { X, Sprout, Calendar, MapPin, DollarSign, Scale } from 'lucide-react';
import { FarmerListing } from "@/components/tengkulak/types";

interface CatatPanenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newListing: FarmerListing) => void;
}

export const CatatPanenModal: React.FC<CatatPanenModalProps> = ({ isOpen, onClose, onSave }) => {
  const [commodity, setCommodity] = useState('Bawang Merah');
  const [amount, setAmount] = useState('1.5');
  const [unit, setUnit] = useState<'Ton' | 'Kg'>('Ton');
  const [targetPrice, setTargetPrice] = useState('29000');
  const [location, setLocation] = useState('Wanasari, Brebes');
  const [description, setDescription] = useState('Panen kualitas super petik baru. Siap muat.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    const newListing: FarmerListing = {
      id: `my-harvest-${Date.now()}`,
      farmerName: 'Budi (Saya)',
      farmerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      commodityName: commodity,
      commodityIcon: commodity.toLowerCase().includes('bawang') ? 'bawang' : 'cabai',
      amount: parseFloat(amount),
      unit: unit,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      buyersCount: 1,
      estimatedPrice: targetPrice ? parseInt(targetPrice, 10) : 28500,
      highestOfferPrice: targetPrice ? parseInt(targetPrice, 10) : undefined,
      location: location,
      phone: '+62 812-9988-7766',
      harvestQuality: 'Super (Grade A)',
      description: description,
      isVerified: true,
      rating: 5.0,
    };

    onSave(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#12241A]">Catat hasil Panen</h2>
              <p className="text-xs text-gray-500">Publikasikan hasil panen Anda ke calon pembeli</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Commodity Select */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Komoditas Panen
            </label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Bawang Merah">Bawang Merah Bima Brebes</option>
              <option value="Cabai Merah Keriting">Cabai Merah Keriting</option>
              <option value="Cabai Rawit Merah">Cabai Rawit Merah (Ori 212)</option>
              <option value="Beras Medium IR64">Beras Medium IR64</option>
              <option value="Jagung Pipil Dry">Jagung Pipil Kering</option>
              <option value="Tomat Sayur Fresh">Tomat Sayur Fresh</option>
            </select>
          </div>

          {/* Amount & Unit */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Jumlah Hasil Panen
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1.2"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
                <Scale className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Satuan
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'Ton' | 'Kg')}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-sm font-bold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Ton">Ton</option>
                <option value="Kg">Kg</option>
              </select>
            </div>
          </div>

          {/* Target Price */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Ekspektasi Harga (Rp/kg)
            </label>
            <div className="relative">
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="28500"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Lokasi Kebun / Gudang
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Wanasari, Brebes"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Catatan / Deskripsi Kualitas
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kualitas, kondisi penjemuran, atau kondisi muat armada..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 px-4 rounded-2xl border border-gray-200 font-bold text-gray-700 text-sm hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2A4736] hover:bg-[#1f3629] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Simpan & Tayangkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
