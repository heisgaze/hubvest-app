import React, { useState } from 'react';
import { OrderItem } from "@/components/tengkulak/types";
import { Search, PackageCheck, Clock, ArrowRight, CheckCircle2, MapPin, TrendingUp, Calendar } from 'lucide-react';

interface OrdersViewProps {
  orders: OrderItem[];
  onSelectOrder: (order: OrderItem) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onSelectOrder }) => {
  const [filter, setFilter] = useState<'Aktif' | 'Selesai' | 'Dibatalkan'>('Selesai');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      filter === 'Aktif'
        ? o.status === 'Aktif' || o.status === 'Menunggu Pickup' || o.status === 'Menunggu Konfirmasi'
        : filter === 'Selesai'
        ? o.status === 'Selesai'
        : o.status === 'Dibatalkan';

    const matchesSearch =
      o.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate totals
  const totalCompletedVal = orders
    .filter((o) => o.status === 'Selesai')
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div id="orders-view-container" className="px-4 pt-3 pb-28 space-y-4 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold tracking-wider text-emerald-800 uppercase">
          HUBVEST TRANSACTION HUB
        </span>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Riwayat & Status Transaksi</h2>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="orders-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama petani, komoditas, atau lokasi..."
          className="w-full bg-white text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm text-slate-800"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-2xl border border-slate-200">
        {(['Aktif', 'Selesai', 'Dibatalkan'] as const).map((st) => (
          <button
            key={st}
            id={`filter-tab-${st.toLowerCase()}`}
            onClick={() => setFilter(st)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
              filter === st
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 my-4 space-y-2">
            <PackageCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-600">Tidak ada transaksi ditemukan di kategori {filter}</p>
            <p className="text-[11px] text-slate-400">Gunakan tab di atas atau ubah kata kunci pencarian.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              id={`order-card-${order.id}`}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 hover:border-emerald-300 transition-all"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {order.commodityName}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    order.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'Menunggu Pickup'
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : order.status === 'Menunggu Konfirmasi'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {order.status === 'Selesai' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  {order.status === 'Menunggu Pickup' && <Clock className="w-3 h-3 text-amber-600" />}
                  {order.status === 'Menunggu Konfirmasi' && <Clock className="w-3 h-3 text-blue-600" />}
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Content body */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={order.farmerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={order.farmerName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{order.farmerName}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {order.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Nilai</span>
                  <span className="text-sm font-extrabold text-emerald-700">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Vol: {order.quantity}</span>
                </div>
              </div>

              {/* Footer action button inside card */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {order.date}
                </span>
                <button
                  id={`btn-detail-${order.id}`}
                  onClick={() => onSelectOrder(order)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 active:scale-95 transition-all"
                >
                  Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Activity Card */}
      <div id="orders-summary-card" className="bg-emerald-900 text-emerald-100 rounded-2xl p-4 space-y-2 border border-emerald-800 shadow-md">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Ringkasan Aktivitas Transaksi
          </span>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-full text-emerald-200">
            Terverifikasi
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/60">
            <span className="text-[10px] text-emerald-300 block">Total Transaksi Selesai</span>
            <span className="text-base font-black text-amber-300 mt-0.5 block">
              Rp {(totalCompletedVal / 1000000).toFixed(1)} Jt
            </span>
          </div>

          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/60">
            <span className="text-[10px] text-emerald-300 block">Volume Terperdagangkan</span>
            <span className="text-base font-black text-emerald-200 mt-0.5 block">
              1.95 Ton
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
