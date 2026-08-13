import React, { useState } from 'react';
import { ArrowLeft, Phone, Truck, ShieldCheck, MapPin, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';
import { OrderItem } from '../types';

interface TransactionDetailViewProps {
  order: OrderItem;
  onBack: () => void;
  onConfirmPickup: () => void;
}

export const TransactionDetailView: React.FC<TransactionDetailViewProps> = ({ order, onBack, onConfirmPickup }) => {
  const [isDone, setIsDone] = useState<boolean>(order.status === 'Selesai');

  const handleTandaiDiambil = () => {
    setIsDone(true);
    setTimeout(() => {
      onConfirmPickup();
    }, 400);
  };

  const handleCallBuyer = () => {
    alert(`Menghubungi pembeli ${order.buyerName || order.farmerName} (+62 812-3456-7890)...`);
  };

  return (
    <div id="tx-detail-container" className="flex flex-col min-h-full bg-slate-100 text-slate-900 pb-16">
      {/* Top Bar */}
      <div id="tx-detail-top-bar" className="sticky top-0 z-20 bg-emerald-800 text-white px-4 py-3.5 flex items-center gap-3 shadow-md">
        <button
          id="tx-detail-back-btn"
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-emerald-700 active:scale-95 transition-all text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-bold leading-tight">Konfirmasi Pengambilan</h1>
          <p className="text-[10px] text-emerald-200">ID Kontrak: {order.id}</p>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-4">
        {/* Important Notice Box */}
        <div id="tx-detail-notice" className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-snug">
            Pastikan pembeli telah tiba di lokasi dan komoditas telah dimuat sebelum mengonfirmasi status pengambilan.
          </p>
        </div>

        {/* Buyer / Driver Info Card */}
        <div id="tx-buyer-card" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PENGAMBIL / PEMBELI</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {order.buyerRole || 'TENGKULAK PREMIUM'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={order.farmerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={order.buyerName || order.farmerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-sm text-slate-900">{order.buyerName || order.farmerName}</h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  {order.buyerVehicle || 'Truk Engkel • B 9921 KIZ'}
                </p>
              </div>
            </div>

            <button
              id="call-buyer-button"
              onClick={handleCallBuyer}
              className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center active:scale-95 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Commodity Transaction Card */}
        <div id="tx-commodity-card" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{order.commodityName}</span>
            <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
              isDone
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800 animate-pulse'
            }`}>
              {isDone ? '✓ Selesai' : 'Menunggu Pickup'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={order.commodityPhoto || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300'}
              alt={order.commodityName}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">{order.commodityName}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Grade A Super • Kualitas Pilihan</div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {order.location}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">KUANTITAS</span>
              <span className="text-xs font-black text-slate-800 mt-0.5 block">{order.quantity}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">HARGA / KG</span>
              <span className="text-xs font-black text-slate-800 mt-0.5 block">Rp {order.offeredPrice.toLocaleString('id-ID')}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">TOTAL</span>
              <span className="text-xs font-black text-emerald-700 mt-0.5 block">
                Rp {(order.totalPrice / 1000000).toFixed(1)} Jt
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="confirm-pickup-cta-btn"
            onClick={handleTandaiDiambil}
            disabled={isDone}
            className={`w-full py-3.5 rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              isDone
                ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95 shadow-emerald-700/20'
            }`}
          >
            {isDone ? (
              '✓ Telah Dikonfirmasi Selesai'
            ) : (
              '✓ Tandai Sudah Diambil & Beri Rating ➢'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
