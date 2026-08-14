"use client";


import Badge from "@/components/petani/ui/Badge";
import StarRating from "@/components/petani/ui/StarRating";
import { formatDate } from "@/lib/utils";

// Removed mock data, using empty fallbacks for build
const currentUser = { id: "", name: "Pengguna", role: "farmer", avatar: "", location: "", rating: 0, totalTransactions: 0, joinedDate: "", verified: false };
const users: any[] = [];
const commodities: any[] = [];
const marketPrices: any[] = [];
const listings: any[] = [];
const bids: any[] = [];
const transactions: any[] = [];
const reviews: any[] = [];
const chatPreviews: any[] = [];
const chatMessages: any = {};

export default function ProfilePage() {
  const userReviews = reviews.filter(r => r.targetId === currentUser.id);

  return (
    <div className="min-h-screen bg-surface-bg pb-24 animate-fade-in">
      {/* Header / Cover */}
      <div className="relative">
        <div className="h-[140px] w-full gradient-primary rounded-b-3xl"></div>
        
        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 bg-primary-light/20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-primary font-bold text-3xl">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {currentUser.location}
            </div>
          </div>
          <Badge variant={currentUser.role === "farmer" ? "role-farmer" : "role-tengkulak"}>
            {currentUser.role === "farmer" ? "Petani" : "Tengkulak"}
          </Badge>
        </div>

        {/* Stats Card */}
        <div className="card mt-6 flex justify-between p-5 animate-slide-up">
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{currentUser.totalTransactions}</div>
            <div className="text-xs text-gray-500 mt-1">Transaksi</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-bold text-gray-900">{currentUser.rating.toFixed(1)}</span>
              <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-xs text-gray-500 mt-1">Rating</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{currentUser.joinedDate.split('-')[0]}</div>
            <div className="text-xs text-gray-500 mt-1">Bergabung</div>
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="px-4 mb-6">
        <div className="card divide-y divide-gray-100 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="flex-1 font-medium text-gray-700">Edit Profil</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="flex-1 font-medium text-gray-700">Riwayat Transaksi</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="flex-1 font-medium text-gray-700">Pengaturan</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="flex-1 font-medium text-gray-700">Bantuan</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-danger">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="flex-1 font-medium text-danger">Keluar</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {userReviews.length > 0 && (
        <div className="px-4 mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">
            Ulasan <span className="text-sm font-normal text-gray-500">({userReviews.length})</span>
          </h2>
          <div className="space-y-4">
            {userReviews.map((review) => (
              <div key={review.id} className="card p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-light/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {review.reviewer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{review.reviewer.name}</h4>
                      <div className="text-xs text-gray-500">{formatDate(review.createdAt)}</div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-gray-700 mt-3">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
