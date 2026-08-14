export interface Commodity {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  changePercent: number;
  isUp: boolean;
  color: string;
  iconType: 'bawang' | 'cabai' | 'beras' | 'jagung' | 'tomat' | 'kentang';
  iconBg: string;
  sparkline: number[];
  marketPrices: {
    location: string;
    price: number;
    updatedAt: string;
  }[];
  description?: string;
  qualityGrade: string;
}

export interface FarmerListing {
  id: string;
  farmerName: string;
  farmerPhoto: string;
  commodityName: string;
  commodityIcon: string;
  commodityPhoto?: string;
  amount: number;
  unit: 'Ton' | 'Kg';
  date: string;
  harvestStartDate?: string;
  buyersCount: number;
  highestOfferPrice?: number;
  estimatedPrice: number;
  location: string;
  phone: string;
  harvestQuality: string;
  description: string;
  isVerified: boolean;
  rating: number;
  refPriceRange?: { min: number; max: number };
}

export interface BiddingData {
  listingId: string;
  farmerName: string;
  farmerPhoto: string;
  commodityName: string;
  commodityPhoto: string;
  location: string;
  volumeKg: number;
  qualityGrade: string;
  harvestDate: string;
  timeAgo: string;
  refPriceMin: number;
  refPriceMax: number;
  marketTrend: string;
  offeredPricePerKg: number;
}

export interface HandshakeReceiptData {
  contractId: string;
  commodityName: string;
  commodityPhoto: string;
  volumeKg: number;
  finalPrice: number;
  pickupDate: string;
  logistics: string;
  meetingPoint: string;
  meetingAddress: string;
}

export interface OrderItem {
  id: string;
  farmerName: string;
  farmerPhoto: string;
  commodityName: string;
  commodityPhoto?: string;
  quantity: string;
  offeredPrice: number;
  totalPrice: number;
  status: 'Aktif' | 'Selesai' | 'Dibatalkan' | 'Menunggu Pickup';
  date: string;
  location: string;
  note?: string;
  buyerName?: string;
  buyerRole?: string;
  buyerVehicle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'price_alert' | 'offer' | 'system';
}

export type TabType = 'HOME' | 'MARKET' | 'ORDERS' | 'PROFILE';

export type ScreenView =
  | { type: 'TAB'; tab: TabType }
  | { type: 'BIDDING'; listing: FarmerListing }
  | { type: 'RECEIPT'; receipt: HandshakeReceiptData }
  | { type: 'TRANSACTION_DETAIL'; order: OrderItem }
  | { type: 'REVIEW'; order: OrderItem };
