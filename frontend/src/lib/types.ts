// ============================================================
// Hubvest Type Definitions
// ============================================================

export interface User {
  id: string;
  name: string;
  role: "farmer" | "tengkulak";
  avatar: string;
  phone: string;
  location: string;
  rating: number;
  totalTransactions: number;
  joinedDate: string;
  verified: boolean;
  coverImage?: string;
}

export interface Commodity {
  id: string;
  name: string;
  image: string;
  unit: string; // kg, ton, ikat
  category: string;
}

export interface MarketPrice {
  id: string;
  commodityId: string;
  commodity: Commodity;
  producerPrice: number; // Harga Produsen
  wholesalePrice: number; // Harga Grosir
  consumerPrice: number; // Harga Konsumen
  previousPrice: number;
  changePercent: number;
  trend: "up" | "down" | "stable";
  date: string;
  location: string;
  sparklineData: number[];
}

export interface PFIResult {
  score: number; // 0-100
  status: "green" | "yellow" | "red";
  label: string;
  description: string;
  farmerPrice: number;
  marketPrice: number;
}

export type GradeLevel = "A" | "B" | "C";

export interface GradeResult {
  grade: GradeLevel;
  confidence: number; // 0-100
  label: string;
  description: string;
  attributes: QualityAttribute[];
  commodityName: string;
  imageUrl: string;
  timestamp: string;
}

export interface QualityAttribute {
  name: string;
  value: string;
  score: number; // 0-100
  icon: string;
}

export interface Listing {
  id: string;
  farmerId: string;
  farmer: User;
  commodity: Commodity;
  volume: number;
  unit: string;
  harvestDate: string;
  location: string;
  minPrice: number;
  grade?: GradeLevel;
  description: string;
  images: string[];
  status: "open" | "locked" | "completed" | "cancelled";
  bidCount: number;
  createdAt: string;
}

export interface Bid {
  id: string;
  listingId: string;
  tengkulakId: string;
  tengkulak: User;
  price: number;
  message: string;
  status: "pending" | "accepted" | "rejected" | "countered";
  createdAt: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  listing: Listing;
  farmerId: string;
  farmer: User;
  tengkulakId: string;
  tengkulak: User;
  agreedPrice: number;
  volume: number;
  unit: string;
  commodity: Commodity;
  status:
    | "pending_confirmation"
    | "confirmed"
    | "pickup_scheduled"
    | "completed"
    | "rated";
  pickupDate: string;
  pickupLocation: string;
  confirmedAt?: string;
  completedAt?: string;
  contractNumber: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  label: string;
  description: string;
  timestamp?: string;
  status: "completed" | "current" | "pending";
}

export interface Review {
  id: string;
  transactionId: string;
  reviewerId: string;
  reviewer: User;
  targetId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatPreview {
  id: string;
  participant: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: "text" | "listing" | "price" | "image";
  listingRef?: Listing;
}
