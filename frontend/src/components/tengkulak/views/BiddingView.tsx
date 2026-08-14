import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, TrendingUp, Sparkles, ShieldCheck, Info, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { FarmerListing, HandshakeReceiptData } from "@/components/tengkulak/types";

interface BiddingViewProps {
  listing: FarmerListing;
  onBack: () => void;
  onSubmitOffer: (receiptData: HandshakeReceiptData) => void;
}

export const BiddingView: React.FC<BiddingViewProps> = ({ listing, onBack, onSubmitOffer }) => {
  const [offerPrice, setOfferPrice] = useState<number>(20000);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const totalCommitment = offerPrice * 500; // 500 kg default volume

  const handleAdjustPrice = (delta: number) => {
    setOfferPrice((prev) => Math.max(1000, prev + delta));
  };

  const handleQuickPreset = (factor: number) => {
    const base = 20000;
    setOfferPrice(Math.round(base * factor));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const receipt: HandshakeReceiptData = {
        contractId: 'HB-8829-BS',
        commodityName: 'Bawang Merah',
        commodityPhoto: listing.commodityPhoto || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&q=80&w=800',
        volumeKg: 500,
        finalPrice: totalCommitment,
        pickupDate: '18 Okt 2023',
        logistics: 'Self-Pickup (Truk / Pikap)',
        meetingPoint: 'Titik Temu Brebes',
        meetingAddress: 'Jl. Raya Pantura No. 45, Wanasari, Brebes, Jawa Tengah'
      };
      onSubmitOffer(receipt);
    }, 600);
  };

  return (
    <div id="bidding-view-container" className="flex flex-col min-h-full bg-slate-50 text-slate-900 pb-12">
      {/* Top Bar */}
      <div id="bidding-top-bar" className="sticky top-0 z-20 bg-emerald-700 text-white px-4 py-3.5 flex items-center gap-3 shadow-md">
        <button
          id="bidding-back-button"
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-emerald-600 active:scale-95 transition-all text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div id="bidding-header-badge" className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-200">LIVE BIDDING HUBVEST</div>
          <h1 id="bidding-header-title" className="text-base font-bold leading-tight">LOT #HB-8829 • 500 KG BAWANG MERAH</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto w-full">
        {/* Commodity Hero Card */}
        <div id="bidding-commodity-card" className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <div className="relative h-44 w-full">
            <img
              src={listing.commodityPhoto || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&q=80&w=800'}
              alt={listing.commodityName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <ShieldCheck className="w-3.5 h-3.5" /> Grade A+ Super
            </div>

            <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow animate-pulse">
              <Clock className="w-3.5 h-3.5" /> 04J 22M 11S
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{listing.commodityName}</h2>
                  <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {listing.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-300">Volume Lot</div>
                  <div className="text-lg font-extrabold text-amber-300">500 Kg</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 text-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={listing.farmerPhoto}
                alt={listing.farmerName}
                className="w-8 h-8 rounded-full border border-emerald-400 object-cover"
              />
              <div>
                <div className="font-semibold text-slate-200">{listing.farmerName}</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Petera Terverifikasi
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Panen Tanggal</span>
              <span className="font-semibold text-amber-400">12 Okt 2023 (2 hr lalu)</span>
            </div>
          </div>
        </div>

        {/* CV Certificate Card */}
        <div id="bidding-cv-certificate" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sertifikat Kualitas AI
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              VERIFIED
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div className="text-slate-500">Hasil Deteksi</div>
            <div className="font-bold text-right text-emerald-700">Grade A (Sangat Baik)</div>
            <div className="text-slate-500">Tingkat Kepercayaan</div>
            <div className="font-bold text-right">98%</div>
            <div className="text-slate-500">Warna</div>
            <div className="font-bold text-right">Sangat Baik</div>
            <div className="text-slate-500">Ukuran</div>
            <div className="font-bold text-right">Seragam</div>
            <div className="text-slate-500">Tekstur</div>
            <div className="font-bold text-right">Padat</div>
          </div>
        </div>

        {/* Market Intel Card */}
        <div id="bidding-market-intel" className="bg-emerald-950 text-emerald-50 rounded-2xl p-4 shadow-sm border border-emerald-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-800/60">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Wawasan Pasar & Referensi
            </div>
            <span className="text-[10px] bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full font-medium">
              STABLE TREND
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-800/50">
              <div className="text-[10px] text-emerald-300 font-medium">Harga Referensi Pasar</div>
              <div className="font-extrabold text-sm text-white mt-0.5">Rp 19.000 - 22.000</div>
              <div className="text-[9px] text-emerald-400">per kg pasar Brebes</div>
            </div>
            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-800/50">
              <div className="text-[10px] text-emerald-300 font-medium">Tawaran Tertinggi Saat Ini</div>
              <div className="font-extrabold text-sm text-amber-300 mt-0.5">Rp 19.500 / kg</div>
              <div className="text-[9px] text-slate-300">Oleh Tengkulak Budi</div>
            </div>
          </div>

          {/* AI Curator Tip */}
          <div id="bidding-curator-tip" className="bg-emerald-900/70 rounded-xl p-3 border border-emerald-700/60 flex items-start gap-2.5 text-xs text-emerald-100">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <span className="font-bold text-amber-200">Tips Kurator Hubvest:</span> "Tawaran di kisaran <strong className="text-white">Rp 20.000</strong> memiliki tingkat keberhasilan <span className="text-emerald-300 font-bold">85%</span> untuk lot ini berdasarkan histori transaksi petani."
            </div>
          </div>
        </div>

        {/* Offer Input Calculator */}
        <div id="bidding-offer-calculator" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Masukkan Harga Penawaran Anda</h3>
            <span className="text-xs text-slate-500 font-medium">Per Kg</span>
          </div>

          {/* Stepper Input */}
          <div className="flex items-center justify-between bg-slate-100 p-2 rounded-2xl border border-slate-300">
            <button
              id="bidding-decrease-price"
              onClick={() => handleAdjustPrice(-500)}
              className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 transition-all hover:bg-slate-50"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="text-center px-2">
              <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block">Harga Penawaran</span>
              <div className="text-2xl font-black text-emerald-700">
                Rp {offerPrice.toLocaleString('id-ID')}
              </div>
            </div>

            <button
              id="bidding-increase-price"
              onClick={() => handleAdjustPrice(500)}
              className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center font-bold text-slate-700 active:scale-95 transition-all hover:bg-slate-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
            <button
              id="preset-min-5"
              onClick={() => handleQuickPreset(0.95)}
              className="py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-all text-center"
            >
              -5%
            </button>
            <button
              id="preset-pasar"
              onClick={() => setOfferPrice(20000)}
              className="py-1.5 rounded-lg border border-emerald-500 bg-emerald-50 text-emerald-800 transition-all text-center font-bold"
            >
              Pasar (20k)
            </button>
            <button
              id="preset-plus-5"
              onClick={() => handleQuickPreset(1.05)}
              className="py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-all text-center"
            >
              +5%
            </button>
            <button
              id="preset-plus-10"
              onClick={() => handleQuickPreset(1.10)}
              className="py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-all text-center"
            >
              +10%
            </button>
          </div>

          {/* Total Commitment Summary */}
          <div id="bidding-commitment-box" className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-600 font-medium block">Total Komitmen Transaksi:</span>
              <span className="text-[10px] text-slate-500">(500 kg x Rp {offerPrice.toLocaleString('id-ID')})</span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-amber-900 block">
                Rp {totalCommitment.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Terms info */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Dengan menawar, Anda mengikat komitmen Digital Handshake. Pembayaran langsung dilakukan di lokasi saat pickup.</span>
          </div>

          {/* CTA Submit Button */}
          <button
            id="bidding-submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 text-sm transition-all"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Memproses Handshake...</span>
            ) : (
              <>
                KIRIM TAWARAN SEKARANG ➢
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
