import { MarketPrice, Listing, Transaction, GradeResult, Bid } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Helper to construct headers
function getHeaders(userId: string, extraHeaders = {}) {
  return {
    "Content-Type": "application/json",
    "X-User-Id": userId,
    ...extraHeaders,
  };
}

// ---------------------------------------------------------------------------
// Market Prices
// ---------------------------------------------------------------------------

export async function fetchMarketPrices(userId: string = "5a351aad-6070-4264-a6e0-bed3232ab399"): Promise<MarketPrice[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/harga/`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) throw new Error("Failed to fetch market prices");
    const data = await res.json();
    
    // Map backend MarketPrice to frontend Price type
    return data.map((item: { commodity_id: string; price: number; trend: string; date: string }) => {
      const commName = item.commodity_id === "c1" ? "Bawang Merah" : item.commodity_id === "c2" ? "Cabai Rawit" : "Kentang";
      return {
      commodity: { id: item.commodity_id, name: commName, image: "", unit: "kg", category: "Sayuran" },
      producerPrice: item.price,
      wholesalePrice: item.price * 1.1, // Mocked derived values for MVP
      consumerPrice: item.price * 1.25,
      trend: item.trend,
      changePercent: 0, // Mocked for MVP
      date: item.date,
      sparklineData: [65, 59, 80, 81, 56, 55, 40]
    };
  });
  } catch (error) {
    console.error("fetchMarketPrices error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Listings & Bids
// ---------------------------------------------------------------------------

export async function fetchListings(userId: string = "5a351aad-6070-4264-a6e0-bed3232ab399"): Promise<Listing[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/listings/`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) throw new Error("Failed to fetch listings");
    const data = await res.json();
    
    // Map backend ListingResponse to frontend Listing type
    return data.map((item: { id: string; seller_id: string; commodity: { name: string }; quantity: number; unit: string; price: number; location: string; created_at: string; grade: string; description: string; status: string; bids: unknown[] }) => ({
      id: item.id,
      farmerId: item.seller_id,
      farmer: { id: item.seller_id, name: "Petani Hubvest", role: "farmer", avatar: "", phone: "", location: "Jawa Tengah", rating: 4.8, totalTransactions: 10, joinedDate: "", verified: true },
      commodity: { id: "c1", name: item.commodity?.name || "Bawang Merah", image: "", unit: item.unit, category: "" },
      volume: item.quantity,
      unit: item.unit,
      minPrice: item.price,
      location: item.location || "Jawa Tengah",
      harvestDate: item.created_at, // Mocking harvest_date as created_at for MVP
      grade: item.grade || "B",
      description: item.description || "",
      images: [],
      status: item.status,
      bidCount: item.bids?.length || 0,
      createdAt: item.created_at,
    }));
  } catch (error) {
    console.error("fetchListings error:", error);
    return [];
  }
}

export async function fetchListing(id: string, userId: string = "5a351aad-6070-4264-a6e0-bed3232ab399"): Promise<{ listing: Listing, bids: Bid[] } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/listings/${id}`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) return null;
    const item = await res.json();
    
    const listing: Listing = {
      id: item.id,
      farmerId: item.seller_id,
      farmer: { id: item.seller_id, name: "Petani Hubvest", role: "farmer", avatar: "", phone: "", location: "Jawa Tengah", rating: 4.8, totalTransactions: 10, joinedDate: "", verified: true },
      commodity: { id: "c1", name: item.commodity?.name || "Bawang Merah", image: "", unit: item.unit, category: "" },
      volume: item.quantity,
      unit: item.unit,
      minPrice: item.price,
      location: item.location || "Jawa Tengah",
      harvestDate: item.created_at,
      grade: item.grade || "B",
      description: item.description || "",
      images: [],
      status: item.status,
      bidCount: item.bids?.length || 0,
      createdAt: item.created_at,
    };
    
    const bids: Bid[] = (item.bids || []).map((b: { id: string; listing_id: string; bidder_id: string; amount: number; status: string; created_at: string }) => ({
      id: b.id,
      listingId: b.listing_id,
      tengkulakId: b.bidder_id,
      tengkulak: { id: b.bidder_id, name: "Tengkulak", role: "tengkulak", avatar: "", phone: "", location: "", rating: 4.5, totalTransactions: 5, joinedDate: "", verified: true },
      price: b.amount,
      message: "Berminat beli panen ini",
      status: b.status,
      createdAt: b.created_at,
    }));
    
    return { listing, bids };
  } catch (error) {
    console.error("fetchListing error:", error);
    return null;
  }
}


// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export async function fetchTransactions(userId: string = "5a351aad-6070-4264-a6e0-bed3232ab399"): Promise<Transaction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data = await res.json();
    
    return data.map((item: { id: string; listing_id: string; buyer_id: string; amount: number; status: string; created_at: string }) => ({
      id: item.id,
      listingId: item.listing_id,
      listing: {} as unknown as Listing, // Mocked for MVP to pass type checker
      farmerId: item.buyer_id, // Mocked reverse
      farmer: { id: item.buyer_id, name: "Petani", role: "farmer", avatar: "", phone: "", location: "", rating: 4.5, totalTransactions: 5, joinedDate: "", verified: true },
      tengkulakId: item.buyer_id,
      tengkulak: { id: item.buyer_id, name: "Tengkulak", role: "tengkulak", avatar: "", phone: "", location: "", rating: 4.5, totalTransactions: 5, joinedDate: "", verified: true },
      commodity: { id: "c1", name: "Bawang Merah", image: "", unit: "kg", category: "" },
      volume: item.amount,
      agreedPrice: item.amount,
      pickupDate: item.created_at,
      pickupLocation: "Jawa Tengah",
      status: item.status,
      createdAt: item.created_at,
    }));
  } catch (error) {
    console.error("fetchTransactions error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Computer Vision (Mock)
// ---------------------------------------------------------------------------

export async function analyzeCV(userId: string = "5a351aad-6070-4264-a6e0-bed3232ab399"): Promise<GradeResult | null> {
  try {
    const formData = new FormData();
    const mockFile = new Blob(["mock"], { type: "image/jpeg" });
    formData.append("file", mockFile, "mock.jpg");

    const res = await fetch(`${API_BASE_URL}/cv/analyze`, {
      method: "POST",
      body: formData,
      headers: {
        "X-User-Id": userId
      }
    });
    
    if (!res.ok) throw new Error("Failed to analyze CV");
    return await res.json();
  } catch (error) {
    console.error("analyzeCV error:", error);
    return null;
  }
}
