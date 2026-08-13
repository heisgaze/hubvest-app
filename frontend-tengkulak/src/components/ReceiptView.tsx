import React from 'react';
import { CheckCircle2, QrCode, MapPin, Calendar, FileText, Download, ArrowRight, ShieldCheck, Phone, Navigation } from 'lucide-react';
import { HandshakeReceiptData } from '../types';

interface ReceiptViewProps {
  receipt: HandshakeReceiptData;
  onGoToOrders: () => void;
  onOpenPickupDetail: () => void;
}

export const ReceiptView: React.FC<ReceiptViewProps> = ({ receipt, onGoToOrders, onOpenPickupDetail }) => {
  const handleDownloadPDF = () => {
    alert(`Mengunduh Kontrak Digital Handshake ${receipt.contractId}.pdf...`);
  };

  return (
    <div id="receipt-view-container" className="flex flex-col min-h-full bg-slate-900 text-white pb-16">
      {/* Top Bar */}
      <div id="receipt-top-bar" className="bg-emerald-800 px-4 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-300" />
          <div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">KONTRAK RESMI HUBVEST</div>
            <h1 className="text-sm font-bold">DIGITAL HANDSHAKE RECEIPT</h1>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-1 rounded-full font-bold">
          ID: {receipt.contractId}
        </span>
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-4">
        {/* Success Header Banner */}
        <div id="receipt-success-banner" className="bg-emerald-600 rounded-2xl p-4 text-center shadow-lg shadow-emerald-900/40 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/30 rounded-full blur-xl" />
          <div className="w-12 h-12 bg-white text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-black text-white">Digital Handshake Berhasil!</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs mx-auto">
            Kesepakatan harga terunci di sistem. Petani dan pembeli telah menyetujui komitmen transaksi.
          </p>
        </div>

        {/* QR Code Verification Box */}
        <div id="receipt-qr-box" className="bg-white text-slate-900 rounded-2xl p-4 text-center shadow-md space-y-2 border border-slate-200">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">QR Code Verifikasi Timbangan</div>
          <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300 inline-block">
            {/* SVG Simulated QR Code */}
            <div className="w-36 h-36 bg-slate-900 p-2 rounded-lg flex items-center justify-center relative">
              <QrCode className="w-32 h-32 text-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[10px]">
                  HV
                </div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Tunjukkan QR Code ini kepada ketua kelompok tani saat proses muat & penimbangan barang.
          </p>
        </div>

        {/* Contract Breakdown Card */}
        <div id="receipt-details-card" className="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="text-xs font-bold text-emerald-400">Rincian Kontrak Komoditas</span>
            <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">18 Okt 2023</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={receipt.commodityPhoto}
              alt={receipt.commodityName}
              className="w-14 h-14 rounded-xl object-cover border border-slate-600"
            />
            <div>
              <h3 className="font-bold text-base text-white">{receipt.commodityName}</h3>
              <p className="text-xs text-slate-300">Volume Lot: <strong className="text-amber-300">{receipt.volumeKg} Kg</strong></p>
              <p className="text-xs text-slate-300">Harga Disepakati: <strong className="text-emerald-400">Rp {(receipt.finalPrice / receipt.volumeKg).toLocaleString('id-ID')} / kg</strong></p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl space-y-2 text-xs border border-slate-700/80">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Nomor Kontrak:</span>
              <span className="font-mono font-bold text-amber-300">{receipt.contractId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Jadwal Pickup:</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {receipt.pickupDate}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 shrink-0">Titik Temu:</span>
              <span className="font-medium text-white text-right leading-tight max-w-[200px]">
                {receipt.meetingPoint}
                <span className="block text-[10px] text-slate-400">{receipt.meetingAddress}</span>
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-300">Total Transaksi:</span>
              <span className="font-extrabold text-emerald-400 text-base">
                Rp {receipt.finalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            id="receipt-route-button"
            onClick={onOpenPickupDetail}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-xs active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4" /> Lihat Rute & Konfirmasi Pengambilan ➢
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="receipt-pdf-button"
              onClick={handleDownloadPDF}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 text-xs active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" /> Export PDF
            </button>
            <button
              id="receipt-orders-button"
              onClick={onGoToOrders}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 text-xs active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Riwayat Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
