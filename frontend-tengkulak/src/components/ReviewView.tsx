import React, { useState } from 'react';
import { Star, CheckCircle2, Send, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
import { OrderItem } from '../types';

interface ReviewViewProps {
  order: OrderItem;
  onBack: () => void;
  onSubmitReview: (rating: number, comment: string) => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({ order, onBack, onSubmitReview }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitReview(rating, comment);
    }, 800);
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5: return 'Sangat Puas! Transaksi Sangat Lancar 🌟';
      case 4: return 'Puas, Sesuai Ekspektasi 👍';
      case 3: return 'Cukup Baik 👌';
      case 2: return 'Perlu Perbaikan 👎';
      case 1: return 'Sangat Kecewa 😞';
      default: return 'Pilih Rating Anda';
    }
  };

  return (
    <div id="review-view-container" className="flex flex-col min-h-full bg-slate-50 text-slate-900 pb-16">
      {/* Top Bar */}
      <div id="review-top-bar" className="sticky top-0 z-20 bg-emerald-800 text-white px-4 py-3.5 flex items-center gap-3 shadow-md">
        <button
          id="review-back-btn"
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-emerald-700 active:scale-95 transition-all text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-bold leading-tight">Ulasan Transaksi</h1>
          <p className="text-[10px] text-emerald-200">Beri masukan untuk mitra pertanian Anda</p>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-5">
        {/* Header Question */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Heart className="w-6 h-6 fill-emerald-600" />
          </div>
          <h2 id="review-title" className="text-lg font-black text-slate-900">Bagaimana pengalaman Anda?</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Berikan ulasan jujur untuk membantu meningkatkan transparansi & reputasi komunitas pertanian Hubvest.
          </p>
        </div>

        {/* Partner Card */}
        <div id="review-partner-card" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
          <img
            src={order.farmerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={order.buyerName || order.farmerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-sm text-slate-800">{order.buyerName || order.farmerName}</h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Mitra Penimbangan • {order.location}
            </p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              Komoditas: {order.commodityName} ({order.quantity})
            </p>
          </div>
        </div>

        {/* Interactive Star Rating Form */}
        <form onSubmit={handleSubmit} id="review-form" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div className="text-center space-y-2">
            <label className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">
              RATING PENGALAMAN
            </label>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  id={`star-button-${star}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 rounded-lg transition-all transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-9 h-9 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400 drop-shadow'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-full inline-block border border-emerald-200">
              {getRatingLabel(hoverRating || rating)}
            </div>
          </div>

          {/* Comment Box */}
          <div className="space-y-1.5">
            <label htmlFor="review-comment-input" className="text-xs font-bold text-slate-700 block">
              Catatan Ulasan (Opsional)
            </label>
            <textarea
              id="review-comment-input"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tuliskan ulasan Anda mengenai kerapian muat, ketepatan timbangan, kejujuran, dan keramahan mitra..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            id="review-submit-cta"
            disabled={submitted}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs active:scale-95 transition-all shadow-emerald-700/20"
          >
            {submitted ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ulasan Terkirim!
              </span>
            ) : (
              <>
                KIRIM ULASAN ➢
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
