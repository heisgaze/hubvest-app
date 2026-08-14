import HeaderBar from "@/components/petani/ui/HeaderBar";
import Badge, { gradeToBadgeVariant } from "@/components/petani/ui/Badge";
import StarRating from "@/components/petani/ui/StarRating";
import BidCard from "@/components/petani/listing/BidCard";
import BidForm from "@/components/petani/listing/BidForm";
import { fetchListing } from "@/lib/api";
import { getRoleCookie } from "@/app/actions";
import { formatRupiah, formatShortDate, getCommodityEmoji } from "@/lib/utils";

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const roleId = await getRoleCookie();
  const isTengkulak = roleId === "c25594e8-7901-40ae-b202-da8d1512990d";
  
  const data = await fetchListing(id);
  if (!data) return null;
  
  const { listing, bids: listingBids } = data;

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title={listing.commodity?.name || "Detail Listing"} showBack transparent />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="text-8xl z-0">{getCommodityEmoji(listing.commodity?.name)}</div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="flex gap-2 mb-2">
            {listing.grade && (
              <Badge variant={gradeToBadgeVariant(listing.grade)}>Grade {listing.grade}</Badge>
            )}
            <Badge variant="active">Aktif</Badge>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {listing.commodity?.name}
          </h1>
          <p className="text-white/90 text-sm">
            {listing.location}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2 relative z-30">
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-card p-5 animate-slide-up">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4 pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Volume</p>
              <p className="font-semibold text-gray-800">{listing.volume} {listing.unit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tanggal Panen</p>
              <p className="font-semibold text-gray-800">{formatShortDate(listing.harvestDate)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Harga Minimum</p>
            <p className="font-bold text-primary text-xl">
              {formatRupiah(listing.minPrice)}<span className="text-sm font-normal text-gray-500">/{listing.unit}</span>
            </p>
          </div>
          
          {listing.description && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>
          )}
        </div>

        {/* Farmer Info */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white font-bold text-lg">
            {listing.farmer?.name?.charAt(0) || 'P'}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{listing.farmer?.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={listing.farmer?.rating || 0} size="sm" />
              <span className="text-xs text-gray-500">({listing.farmer?.totalTransactions || 0} tr)</span>
            </div>
          </div>
        </div>

        {/* Bids Section */}
        <div className="pt-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Penawaran Masuk</h3>
            <Badge variant="pfi-yellow">{listingBids.length} Penawaran</Badge>
          </div>
          
          {listingBids.length > 0 ? (
            <div className="space-y-3">
              {listingBids.map(bid => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">Belum ada penawaran</p>
            </div>
          )}
        </div>
      </div>
      
      {isTengkulak && listing.status === "active" && (
        <BidForm listingId={listing.id} minPrice={listing.minPrice} />
      )}
    </div>
  );
}
