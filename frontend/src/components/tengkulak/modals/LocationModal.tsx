import React from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  currentLocation: string;
  onClose: () => void;
  onSelectLocation: (loc: string) => void;
}

const REGIONS = [
  'Brebes, Jawa Tengah',
  'Malang, Jawa Timur',
  'Demak, Jawa Tengah',
  'Nganjuk, Jawa Timur',
  'Garut, Jawa Barat',
  'Probolinggo, Jawa Timur',
  'Pasuruan, Jawa Timur',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  currentLocation,
  onClose,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#12241A]">Pilih Wilayah Pantau</h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {REGIONS.map((region) => {
            const isSelected = region === currentLocation;
            return (
              <button
                key={region}
                onClick={() => {
                  onSelectLocation(region);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-gray-400'}`} />
                  <span>{region}</span>
                </div>

                {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
