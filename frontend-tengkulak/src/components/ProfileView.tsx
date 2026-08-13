import React from 'react';
import { User, MapPin, Award, Phone, Settings, HelpCircle, LogOut, ChevronRight, Sprout } from 'lucide-react';

interface ProfileViewProps {
  location: string;
  onLocationClick: () => void;
  myListingsCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  location,
  onLocationClick,
  myListingsCount,
}) => {
  return (
    <div className="px-5 pt-3 pb-24 space-y-5 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 text-center">
        <div className="relative inline-block mb-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            alt="Budi"
            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-emerald-50 shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-[#2A4736] text-white p-1.5 rounded-full shadow-xs">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#12241A]">Budi Santoso</h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Petani & Pengepul Terverifikasi</p>

        <button
          onClick={onLocationClick}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold mt-3 hover:bg-emerald-100 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 p-3 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Panen Aktif</span>
            <span className="text-lg font-extrabold text-[#12241A]">{myListingsCount} Item</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Terjual</span>
            <span className="text-lg font-extrabold text-[#12241A]">12.4 Ton</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Rating</span>
            <span className="text-lg font-extrabold text-amber-600">4.9 ★</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-[26px] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 divide-y divide-gray-100">
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#12241A]">Daftar Hasil Panen Saya</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#12241A]">Pengaturan Kontak WhatsApp</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#12241A]">Pengaturan Notifikasi Pasar</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#12241A]">Bantuan & Layanan Bantuan Tani</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
