export const dynamic = "force-dynamic";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import { fetchListings } from "@/lib/api";
import Link from "next/link";
import ListingView from "./ListingView";

export default async function ListingIndexPage() {
  const listings = await fetchListings("all");

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HeaderBar title="Listing Panen" />
      
      <ListingView initialListings={listings} />

      {/* FAB */}
      <Link href="/listing/create">
        <button className="fixed bottom-20 right-4 w-14 h-14 bg-accent text-white rounded-full shadow-float flex items-center justify-center hover:scale-105 transition-transform z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
