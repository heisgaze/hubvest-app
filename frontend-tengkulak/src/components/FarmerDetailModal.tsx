import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Phone, Star, ShieldCheck, TrendingUp, MessageSquare } from 'lucide-react';
import { FarmerListing } from '../types';

interface FarmerDetailModalProps {
  farmer: FarmerListing | null;
  onClose: () => void;
  onSubmitOffer: (farmer: FarmerListing, quantity: string, price: number) => void;
}

export const FarmerDetailModal: React.FC<FarmerDetailModalProps> = ({
  farmer,
  onClose,
  onSubmitOffer,
}) => {
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('100');
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);

  if (!farmer) return null;

  const handleTawar = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(offerPrice, 10);
    if (!priceNum || priceNum <= 0) return;

    onSubmitOffer(farmer, quantity, priceNum);
    setIsOfferSubmitted(true);
    setTimeout(() => {
      setIsOfferSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={farmer.farmerPhoto}
                alt={farmer.farmerName}
                className="w-14 h-14 rounded-2xl object-cover shadow-xs"
              />
              {farmer.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-bold text-[#12241A]">{farmer.farmerName}</h2>
                <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  {farmer.rating}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{farmer.location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Listing Summary */}
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Komoditas Panen
              </span>
              <h3 className="text-lg font-bold text-[#12241A]">{farmer.commodityName}</h3>
              <p className="text-xs text-gray-600 font-medium">
                Tersedia: <strong>{farmer.amount} {farmer.unit}</strong> • Dipanen {farmer.date}
              </p>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-xl text-center shadow-2xs border border-emerald-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Minat</span>
              <span className="text-sm font-extrabold text-emerald-800">
                {farmer.buyersCount} Pembeli
              </span>
            </div>
          </div>

          {farmer.highestOfferPrice && (
            <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900 font-semibold">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Penawaran Tertinggi:
              </span>
              <strong className="text-sm font-extrabold text-emerald-900">
                Rp {farmer.highestOfferPrice.toLocaleString('id-ID')}/kg
              </strong>
            </div>
          )}
        </div>

        {/* Description & Quality */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kualitas: <strong className="text-emerald-800">{farmer.harvestQuality}</strong></span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
            {farmer.description}
          </p>
        </div>

        {/* Contact Farmer */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-2xl border border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{farmer.phone}</span>
          </div>
          <a
            href={`https://wa.me/${farmer.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>

        {/* Submit Offer Form */}
        {isOfferSubmitted ? (
          <div className="mt-5 p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2 animate-in zoom-in-95">
            <CheckCircle className="w-5 h-5 text-emerald-700" />
            Penawaran berhasil dikirim ke {farmer.farmerName}!
          </div>
        ) : (
          <form onSubmit={handleTawar} className="mt-5 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Ajukan Penawaran Harga (Tawar)
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Jumlah Dibeli (Kg)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="100"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Harga Tawar (Rp/kg)
                </label>
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="29000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-[#12241A] focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#2A4736] hover:bg-[#1f3629] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              Kirim Penawaran Ke {farmer.farmerName}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
