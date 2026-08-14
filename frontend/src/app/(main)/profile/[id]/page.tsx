"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { formatDate, formatRupiah } from "@/lib/utils";
import Badge, { gradeToBadgeVariant } from "@/components/petani/ui/Badge";
import StarRating from "@/components/petani/ui/StarRating";

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

export default function OtherProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  // Find user or fallback to first non-current user
  const user = users.find(u => u.id === userId) || users[1];
  
  const userReviews = reviews.filter(r => r.targetId === user.id);
  const userListings = listings.filter(l => l.farmerId === user.id && l.status === "active");

  return (
    <div className="min-h-screen bg-surface-bg pb-24 animate-fade-in relative">
      {/* Absolute Back Button since header is custom */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header / Cover */}
      <div className="relative">
        <div className="h-[140px] w-full gradient-accent rounded-b-3xl"></div>
        
        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-accent font-bold text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </div>
          </div>
          <Badge variant={user.role === "farmer" ? "role-farmer" : "role-tengkulak"}>
            {user.role === "farmer" ? "Petani" : "Tengkulak"}
          </Badge>
        </div>

        {/* Stats Card */}
        <div className="card mt-6 flex justify-between p-5 animate-slide-up">
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{user.totalTransactions}</div>
            <div className="text-xs text-gray-500 mt-1">Transaksi</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-bold text-gray-900">{user.rating.toFixed(1)}</span>
              <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-xs text-gray-500 mt-1">Rating</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{user.joinedDate.split('-')[0]}</div>
            <div className="text-xs text-gray-500 mt-1">Bergabung</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Link href={`/chat/c${user.id}`} className="flex-1">
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </button>
          </Link>
          <button className="btn-secondary flex-1">
            Lihat Listing
          </button>
        </div>
      </div>

      {/* Active Listings Section */}
      {userListings.length > 0 && (
        <div className="px-4 mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Listing Aktif</h2>
          <div className="space-y-4">
            {userListings.map((listing) => (
              <Link key={listing.id} href={`/market/listing/${listing.id}`} className="block">
                <div className="card p-4 flex gap-4 hover:shadow-card-hover transition-shadow">
                  <div className="w-20 h-20 rounded-xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
                    {listing.commodity.id === 'c1' ? '🧅' : listing.commodity.id === 'c2' ? '🌶️' : '🍅'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{listing.commodity.name}</h3>
                    <p className="font-bold text-primary text-sm mt-1">
                      {formatRupiah(listing.minPrice)} <span className="text-gray-500 font-normal">/ {listing.unit}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {listing.grade && (
                        <Badge variant={gradeToBadgeVariant(listing.grade)} size="sm">
                          Grade {listing.grade}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{listing.volume} kg tersedia</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {userReviews.length > 0 && (
        <div className="px-4 mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
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
