import { MarketPrice, Listing, Transaction, GradeResult, Bid, Commodity, User } from "./types";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser should use relative path
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://127.0.0.1:3000'; // SSR fallback
};

const API_BASE_URL = `${getBaseUrl()}/api/v1`;

// Helper to construct headers
function getHeaders(userId: string = "u1", extraHeaders = {}) {
  return {
    "Content-Type": "application/json",
    "X-User-Id": userId,
    ...extraHeaders,
  };
}

// ---------------------------------------------------------------------------
// Market Prices
// ---------------------------------------------------------------------------

export async function fetchMarketPrices(userId: string = "u1"): Promise<MarketPrice[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/market-prices`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) throw new Error("Failed to fetch market prices");
    const data = await res.json();
    
    return data.map((item: any) => {
      return {
        commodity: { id: item.id, name: item.commodity, image: "", unit: "kg", category: "Umum" },
        producerPrice: item.price,
        wholesalePrice: item.price * 1.1,
        consumerPrice: item.price * 1.25,
        trend: item.trend,
        changePercent: item.trend === "up" ? 2.5 : item.trend === "down" ? -1.5 : 0,
        date: item.date,
        location: item.location || "Brebes",
        sparklineData: [65, 59, 80, 81, 56, 55, 40]
      };
    });
  } catch (error) {
    console.error("fetchMarketPrices error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export async function submitReview(
  transactionId: string, 
  revieweeId: string, 
  rating: number, 
  comment: string = "", 
  userId: string = "u1"
): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/${transactionId}/reviews`, {
      method: "POST",
      headers: getHeaders(userId),
      body: JSON.stringify({
        transaction_id: transactionId,
        reviewer_id: userId,
        reviewee_id: revieweeId,
        rating: rating,
        comment: comment
      })
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail || "Gagal mengirim penilaian" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("submitReview error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

// ---------------------------------------------------------------------------
// Computer Vision
// ---------------------------------------------------------------------------

export async function analyzeCV(imageBlob?: Blob | File, userId: string = "u1"): Promise<GradeResult | null> {
  try {
    const formData = new FormData();
    
    if (imageBlob) {
      formData.append("file", imageBlob, "scan.jpg");
    } else {
      const mockFile = new Blob(["mock"], { type: "image/jpeg" });
      formData.append("file", mockFile, "mock.jpg");
    }

    const res = await fetch(`${API_BASE_URL}/cv/analyze`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Failed to analyze CV");
    const data = await res.json();
    
    // Map the backend response to GradeResult type
    const gradeVal = data.grade.replace("Grade ", "") as "A" | "B" | "C";
    
    return {
      grade: gradeVal,
      confidence: data.confidence * 100, // Convert to 0-100 scale
      label: data.grade,
      description: data.description,
      attributes: [
        { name: "Warna", value: "Sangat Baik", score: 95, icon: "🎨" },
        { name: "Ukuran", value: "Seragam", score: 90, icon: "📏" },
        { name: "Tekstur", value: "Padat", score: 88, icon: "🔍" }
      ],
      commodityName: "Bawang Merah",
      imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&q=80&w=800",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("analyzeCV error:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Listings
// ---------------------------------------------------------------------------

export async function fetchListings(status: string = "open", userId: string = "u1"): Promise<Listing[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/listings?status=${status}`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) throw new Error("Failed to fetch listings");
    const data = await res.json();
    
    return data.map((item: any) => ({
      id: item.id,
      farmerId: item.seller_id,
      farmer: item.seller ? {
        id: item.seller.id,
        name: item.seller.name,
        role: item.seller.role,
        avatar: item.seller.avatar,
        phone: item.seller.phone,
        location: item.seller.location,
        rating: item.seller.rating,
        totalTransactions: item.seller.total_transactions,
        joinedDate: item.seller.created_at,
        verified: item.seller.verified
      } : { id: "u1", name: "Petani", role: "farmer", avatar: "", phone: "08123456789", location: "Jawa Barat", rating: 5.0, totalTransactions: 10, joinedDate: "", verified: true },
      commodity: item.commodity ? {
        id: item.commodity.id,
        name: item.commodity.name,
        image: "",
        unit: item.unit,
        category: "Umum"
      } : { id: "c1", name: "Sayuran", image: "", unit: "kg", category: "Umum" },
      volume: item.quantity,
      unit: item.unit,
      minPrice: item.price,
      location: item.location,
      harvestDate: item.created_at,
      grade: item.grade || "B",
      description: item.description || "",
      images: item.image_url ? [item.image_url] : [],
      status: item.status,
      bidCount: 0,
      createdAt: item.created_at,
    }));
  } catch (error) {
    console.error("fetchListings error:", error);
    return [];
  }
}

export async function createListing(payload: any, userId: string = "u1"): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/listings`, {
      method: "POST",
      headers: getHeaders(userId),
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail || "Gagal membuat listing" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("createListing error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi" };
  }
}

export async function deleteListing(id: string, userId: string = "u1"): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "DELETE",
      headers: getHeaders(userId),
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail || "Gagal menghapus listing" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("deleteListing error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi" };
  }
}

export async function fetchListing(id: string, userId: string = "u1"): Promise<{ listing: Listing, bids: Bid[] } | null> {
  try {
    const resListing = await fetch(`${API_BASE_URL}/listings/${id}`, { cache: "no-store", headers: getHeaders(userId) });
    if (!resListing.ok) return null;
    const item = await resListing.json();
    
    const listing: Listing = {
      id: item.id,
      farmerId: item.seller_id,
      farmer: item.seller ? {
        id: item.seller.id,
        name: item.seller.name,
        role: item.seller.role,
        avatar: item.seller.avatar,
        phone: item.seller.phone,
        location: item.seller.location,
        rating: item.seller.rating,
        totalTransactions: item.seller.total_transactions,
        joinedDate: item.seller.created_at,
        verified: item.seller.verified
      } : { id: "u1", name: "Petani", role: "farmer", avatar: "", phone: "08123456789", location: "Jawa Barat", rating: 5.0, totalTransactions: 10, joinedDate: "", verified: true },
      commodity: item.commodity ? {
        id: item.commodity.id,
        name: item.commodity.name,
        image: "",
        unit: item.unit,
        category: "Umum"
      } : { id: "c1", name: "Sayuran", image: "", unit: "kg", category: "Umum" },
      volume: item.quantity,
      unit: item.unit,
      minPrice: item.price,
      location: item.location,
      harvestDate: item.created_at,
      grade: item.grade || "B",
      description: item.description || "",
      images: item.image_url ? [item.image_url] : [],
      status: item.status,
      bidCount: 0,
      createdAt: item.created_at,
    };
    
    // Fetch Bids for this listing
    const resBids = await fetch(`${API_BASE_URL}/bids/listing/${id}`, { cache: "no-store", headers: getHeaders(userId) });
    let bidsData = [];
    if (resBids.ok) {
      bidsData = await resBids.json();
    }
    
    const bids: Bid[] = bidsData.map((b: any) => ({
      id: b.id,
      listingId: b.listing_id,
      tengkulakId: b.bidder_id,
      tengkulak: b.bidder ? {
        id: b.bidder.id,
        name: b.bidder.name,
        role: b.bidder.role,
        avatar: b.bidder.avatar,
        phone: b.bidder.phone,
        location: b.bidder.location,
        rating: b.bidder.rating,
        totalTransactions: b.bidder.total_transactions,
        joinedDate: b.bidder.created_at,
        verified: b.bidder.verified
      } : { id: "t1", name: "Tengkulak", role: "tengkulak", avatar: "", phone: "08123456789", location: "Pasar", rating: 5.0, totalTransactions: 10, joinedDate: "", verified: true },
      price: b.amount,
      message: "Berminat beli panen ini",
      status: b.status,
      createdAt: b.created_at
    }));
    
    return { listing, bids };
  } catch (error) {
    console.error("fetchListing error:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Smart Bidding
// ---------------------------------------------------------------------------

export async function submitBid(listingId: string, amount: number, userId: string = "t1"): Promise<{ success: boolean, message?: string, data?: any }> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids`, {
      method: "POST",
      headers: getHeaders(userId),
      body: JSON.stringify({
        listing_id: listingId,
        bidder_id: userId,
        amount: amount
      })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, message: data.detail || "Gagal mengajukan penawaran" };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error("submitBid error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function acceptBid(bidId: string, userId: string = "u1"): Promise<{ success: boolean, message?: string, transaction_id?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/${bidId}/accept`, {
      method: "POST",
      headers: getHeaders(userId)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, message: data.detail || "Gagal menerima tawaran" };
    }
    
    return { success: true, transaction_id: data.transaction_id };
  } catch (error) {
    console.error("acceptBid error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function rejectBid(bidId: string, userId: string = "u1"): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/${bidId}/reject`, {
      method: "POST",
      headers: getHeaders(userId)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, message: data.detail || "Gagal menolak tawaran" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("rejectBid error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export async function fetchMyBids(userId: string = "t1"): Promise<Bid[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/me/bids`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) return [];
    const items = await res.json();
    return items.map((b: any) => ({
      id: b.id,
      listingId: b.listing_id,
      tengkulakId: b.bidder_id,
      tengkulak: b.bidder ? {
        id: b.bidder.id,
        name: b.bidder.name,
        role: b.bidder.role,
        avatar: b.bidder.avatar,
        phone: b.bidder.phone,
        location: b.bidder.location,
        rating: b.bidder.rating,
        totalTransactions: b.bidder.total_transactions,
        joinedDate: b.bidder.created_at,
        verified: b.bidder.verified
      } : { id: "t1", name: "Tengkulak", role: "tengkulak", avatar: "", phone: "08123456789", location: "Pasar", rating: 5.0, totalTransactions: 10, joinedDate: "", verified: true },
      price: b.amount,
      message: "Berminat beli panen ini",
      status: b.status,
      createdAt: b.created_at
    }));
  } catch (error) {
    console.error("fetchMyBids error:", error);
    return [];
  }
}

export async function fetchIncomingBids(userId: string = "u1"): Promise<Bid[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/incoming/bids`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) return [];
    const items = await res.json();
    return items.map((b: any) => ({
      id: b.id,
      listingId: b.listing_id,
      tengkulakId: b.bidder_id,
      tengkulak: b.bidder ? {
        id: b.bidder.id,
        name: b.bidder.name,
        role: b.bidder.role,
        avatar: b.bidder.avatar,
        phone: b.bidder.phone,
        location: b.bidder.location,
        rating: b.bidder.rating,
        totalTransactions: b.bidder.total_transactions,
        joinedDate: b.bidder.created_at,
        verified: b.bidder.verified
      } : { id: "t1", name: "Tengkulak", role: "tengkulak", avatar: "", phone: "08123456789", location: "Pasar", rating: 5.0, totalTransactions: 10, joinedDate: "", verified: true },
      price: b.amount,
      message: "Berminat beli panen ini",
      status: b.status,
      createdAt: b.created_at
    }));
  } catch (error) {
    console.error("fetchIncomingBids error:", error);
    return [];
  }
}

export async function fetchMyTransactions(userId: string = "u1"): Promise<Transaction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/me/all`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) return [];
    const items = await res.json();
    return items.map((item: any) => ({
      id: item.id,
      listingId: item.listing_id,
      listing: item.listing,
      farmerId: item.seller_id,
      farmer: item.seller,
      tengkulakId: item.buyer_id,
      tengkulak: item.buyer,
      commodity: item.listing?.commodity || { id: "c1", name: "Bawang Merah", image: "", unit: "kg", category: "" },
      volume: item.listing?.quantity || 0,
      unit: item.listing?.unit || "kg",
      agreedPrice: item.final_price,
      pickupDate: item.created_at,
      pickupLocation: item.meeting_address || "Lokasi Petani",
      status: item.status,
      contractNumber: item.id.substring(0, 8),
      timeline: []
    }));
  } catch (error) {
    console.error("fetchMyTransactions error:", error);
    return [];
  }
}

export async function completeTransaction(transactionId: string, userId: string = "u1"): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/${transactionId}/complete`, {
      method: "POST",
      headers: getHeaders(userId)
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail || "Gagal menyelesaikan transaksi" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("completeTransaction error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function cancelTransaction(transactionId: string, userId: string = "u1"): Promise<{ success: boolean, message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/${transactionId}/cancel`, {
      method: "POST",
      headers: getHeaders(userId)
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail || "Gagal membatalkan transaksi" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("cancelTransaction error:", error);
    return { success: false, message: "Terjadi kesalahan server" };
  }
}

export async function fetchTransactions(userId: string = "u1"): Promise<Transaction[]> {
  try {
    // In a real app, we would fetch /transactions?user_id=...
    // But since we didn't build a list endpoint, we'll return empty for MVP dashboard unless we build it
    return [];
  } catch (error) {
    console.error("fetchTransactions error:", error);
    return [];
  }
}

export async function fetchTransactionDetail(transactionId: string, userId: string = "u1"): Promise<Transaction | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, { cache: "no-store", headers: getHeaders(userId) });
    if (!res.ok) return null;
    
    const item = await res.json();
    
    return {
      id: item.id,
      listingId: item.listing_id,
      listing: item.listing,
      farmerId: item.seller_id,
      farmer: item.seller,
      tengkulakId: item.buyer_id,
      tengkulak: item.buyer,
      commodity: item.listing?.commodity || { id: "c1", name: "Bawang Merah", image: "", unit: "kg", category: "" },
      volume: item.listing?.quantity || 0,
      unit: item.listing?.unit || "kg",
      agreedPrice: item.final_price,
      pickupDate: item.created_at,
      pickupLocation: item.meeting_address || "Lokasi Petani",
      status: item.status,
      contractNumber: item.id.substring(0, 8),
      timeline: []
    };
  } catch (error) {
    console.error("fetchTransactionDetail error:", error);
    return null;
  }
}
