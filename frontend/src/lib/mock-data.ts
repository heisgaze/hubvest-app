import {
  User,
  Commodity,
  MarketPrice,
  Listing,
  Bid,
  Transaction,
  Review,
  ChatPreview,
  Message,
  GradeResult,
  TimelineEvent,
} from "./types";

// ============================================================
// Users
// ============================================================
export const currentUser: User = {
  id: "u1",
  name: "Pak Mulyono",
  role: "farmer",
  avatar: "/images/avatars/farmer1.jpg",
  phone: "+62 812-3456-7890",
  location: "Brebes, Jawa Tengah",
  rating: 4.8,
  totalTransactions: 24,
  joinedDate: "2024-03-15",
  verified: true,
  coverImage: "/images/covers/farm1.jpg",
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Haji Mulyana",
    role: "tengkulak",
    avatar: "/images/avatars/tengkulak1.jpg",
    phone: "+62 813-9876-5432",
    location: "Cirebon, Jawa Barat",
    rating: 4.5,
    totalTransactions: 156,
    joinedDate: "2023-06-01",
    verified: true,
    coverImage: "/images/covers/market1.jpg",
  },
  {
    id: "u3",
    name: "Pak Slamet",
    role: "tengkulak",
    avatar: "/images/avatars/tengkulak2.jpg",
    phone: "+62 857-1234-5678",
    location: "Tegal, Jawa Tengah",
    rating: 4.2,
    totalTransactions: 89,
    joinedDate: "2024-01-10",
    verified: true,
    coverImage: "/images/covers/market2.jpg",
  },
  {
    id: "u4",
    name: "Bu Sari",
    role: "farmer",
    avatar: "/images/avatars/farmer2.jpg",
    phone: "+62 896-5432-1098",
    location: "Malang, Jawa Timur",
    rating: 4.9,
    totalTransactions: 31,
    joinedDate: "2024-02-20",
    verified: true,
  },
  {
    id: "u5",
    name: "Pak Darmawan",
    role: "tengkulak",
    avatar: "/images/avatars/tengkulak3.jpg",
    phone: "+62 878-9012-3456",
    location: "Bandung, Jawa Barat",
    rating: 4.7,
    totalTransactions: 210,
    joinedDate: "2023-01-05",
    verified: true,
  },
];

// ============================================================
// Commodities
// ============================================================
export const commodities: Commodity[] = [
  {
    id: "c1",
    name: "Bawang Merah",
    image: "/images/commodities/bawang-merah.jpg",
    unit: "kg",
    category: "Sayuran",
  },
  {
    id: "c2",
    name: "Cabai Rawit",
    image: "/images/commodities/cabai-rawit.jpg",
    unit: "kg",
    category: "Sayuran",
  },
  {
    id: "c3",
    name: "Kentang",
    image: "/images/commodities/kentang.jpg",
    unit: "kg",
    category: "Sayuran",
  },
  {
    id: "c4",
    name: "Tomat",
    image: "/images/commodities/tomat.jpg",
    unit: "kg",
    category: "Sayuran",
  },
  {
    id: "c5",
    name: "Bawang Putih",
    image: "/images/commodities/bawang-putih.jpg",
    unit: "kg",
    category: "Sayuran",
  },
  {
    id: "c6",
    name: "Wortel",
    image: "/images/commodities/wortel.jpg",
    unit: "kg",
    category: "Sayuran",
  },
];

// ============================================================
// Market Prices
// ============================================================
export const marketPrices: MarketPrice[] = [
  {
    id: "mp1",
    commodityId: "c1",
    commodity: commodities[0],
    producerPrice: 28500,
    wholesalePrice: 35000,
    consumerPrice: 42000,
    previousPrice: 27000,
    changePercent: 5.6,
    trend: "up",
    date: "2026-08-13",
    sparklineData: [25, 26, 27, 25, 28, 27, 28, 29, 28, 29, 30, 28],
  },
  {
    id: "mp2",
    commodityId: "c2",
    commodity: commodities[1],
    producerPrice: 55000,
    wholesalePrice: 68000,
    consumerPrice: 85000,
    previousPrice: 58000,
    changePercent: -5.2,
    trend: "down",
    date: "2026-08-13",
    sparklineData: [60, 62, 58, 55, 57, 56, 58, 55, 53, 55, 56, 55],
  },
  {
    id: "mp3",
    commodityId: "c3",
    commodity: commodities[2],
    producerPrice: 12000,
    wholesalePrice: 15000,
    consumerPrice: 18000,
    previousPrice: 11500,
    changePercent: 4.3,
    trend: "up",
    date: "2026-08-13",
    sparklineData: [10, 11, 10, 11, 12, 11, 12, 11, 12, 12, 11, 12],
  },
  {
    id: "mp4",
    commodityId: "c4",
    commodity: commodities[3],
    producerPrice: 8000,
    wholesalePrice: 11000,
    consumerPrice: 14000,
    previousPrice: 8500,
    changePercent: -5.9,
    trend: "down",
    date: "2026-08-13",
    sparklineData: [9, 10, 9, 8, 9, 8, 9, 8, 7, 8, 8, 8],
  },
  {
    id: "mp5",
    commodityId: "c5",
    commodity: commodities[4],
    producerPrice: 32000,
    wholesalePrice: 38000,
    consumerPrice: 45000,
    previousPrice: 31000,
    changePercent: 3.2,
    trend: "up",
    date: "2026-08-13",
    sparklineData: [30, 29, 31, 30, 32, 31, 32, 31, 32, 33, 32, 32],
  },
  {
    id: "mp6",
    commodityId: "c6",
    commodity: commodities[5],
    producerPrice: 11000,
    wholesalePrice: 14000,
    consumerPrice: 17000,
    previousPrice: 11000,
    changePercent: 0,
    trend: "stable",
    date: "2026-08-13",
    sparklineData: [11, 11, 12, 11, 11, 12, 11, 11, 12, 11, 11, 11],
  },
];

// ============================================================
// Listings
// ============================================================
export const listings: Listing[] = [
  {
    id: "l1",
    farmerId: "u1",
    farmer: currentUser,
    commodity: commodities[0],
    volume: 500,
    unit: "kg",
    harvestDate: "2026-08-15",
    location: "Brebes, Jawa Tengah",
    minPrice: 28000,
    grade: "A",
    description: "Bawang merah segar hasil panen musim ini. Kualitas super, ukuran seragam, tanpa cacat.",
    images: ["/images/commodities/bawang-merah.jpg"],
    status: "active",
    bidCount: 3,
    createdAt: "2026-08-12T08:00:00Z",
  },
  {
    id: "l2",
    farmerId: "u4",
    farmer: users[3],
    commodity: commodities[2],
    volume: 1200,
    unit: "kg",
    harvestDate: "2026-08-18",
    location: "Malang, Jawa Timur",
    minPrice: 11000,
    grade: "B",
    description: "Kentang granola segar dari dataran tinggi Malang. Ukuran medium-besar.",
    images: ["/images/commodities/kentang.jpg"],
    status: "active",
    bidCount: 2,
    createdAt: "2026-08-11T10:30:00Z",
  },
  {
    id: "l3",
    farmerId: "u1",
    farmer: currentUser,
    commodity: commodities[1],
    volume: 200,
    unit: "kg",
    harvestDate: "2026-08-20",
    location: "Brebes, Jawa Tengah",
    minPrice: 52000,
    grade: "A",
    description: "Cabai rawit merah organik. Tingkat kepedasan tinggi, cocok untuk industri sambal.",
    images: ["/images/commodities/cabai-rawit.jpg"],
    status: "negotiating",
    bidCount: 5,
    createdAt: "2026-08-10T14:00:00Z",
  },
  {
    id: "l4",
    farmerId: "u1",
    farmer: currentUser,
    commodity: commodities[3],
    volume: 800,
    unit: "kg",
    harvestDate: "2026-08-10",
    location: "Brebes, Jawa Tengah",
    minPrice: 7500,
    grade: "B",
    description: "Tomat merah segar untuk kebutuhan pasar tradisional.",
    images: ["/images/commodities/tomat.jpg"],
    status: "sold",
    bidCount: 4,
    createdAt: "2026-08-05T09:00:00Z",
  },
];

// ============================================================
// Bids
// ============================================================
export const bids: Bid[] = [
  {
    id: "b1",
    listingId: "l1",
    tengkulakId: "u2",
    tengkulak: users[1],
    price: 30000,
    message: "Saya bisa ambil semua 500kg. Bisa pickup langsung ke lahan.",
    status: "pending",
    createdAt: "2026-08-12T10:00:00Z",
  },
  {
    id: "b2",
    listingId: "l1",
    tengkulakId: "u3",
    tengkulak: users[2],
    price: 28500,
    message: "Harga pas untuk kualitas grade A. Pengambilan hari Sabtu.",
    status: "pending",
    createdAt: "2026-08-12T11:30:00Z",
  },
  {
    id: "b3",
    listingId: "l1",
    tengkulakId: "u5",
    tengkulak: users[4],
    price: 31000,
    message: "Tertarik dengan bawang merah grade A. Bisa ambil besok.",
    status: "pending",
    createdAt: "2026-08-12T14:00:00Z",
  },
  {
    id: "b4",
    listingId: "l2",
    tengkulakId: "u2",
    tengkulak: users[1],
    price: 12500,
    message: "Untuk kentang 1.2 ton, saya tawarkan harga Rp12.500/kg.",
    status: "pending",
    createdAt: "2026-08-12T09:00:00Z",
  },
  {
    id: "b5",
    listingId: "l2",
    tengkulakId: "u5",
    tengkulak: users[4],
    price: 13000,
    message: "Saya bisa ambil semua. Pembayaran cash di tempat.",
    status: "pending",
    createdAt: "2026-08-12T15:00:00Z",
  },
];

// ============================================================
// Transactions
// ============================================================
const transactionTimeline: TimelineEvent[] = [
  {
    id: "t1",
    label: "Kesepakatan Harga",
    description: "Harga disepakati oleh kedua pihak",
    timestamp: "2026-08-06T10:00:00Z",
    status: "completed",
  },
  {
    id: "t2",
    label: "Konfirmasi Petani",
    description: "Pak Mulyono mengkonfirmasi transaksi",
    timestamp: "2026-08-06T10:30:00Z",
    status: "completed",
  },
  {
    id: "t3",
    label: "Konfirmasi Tengkulak",
    description: "Haji Mulyana mengkonfirmasi transaksi",
    timestamp: "2026-08-06T11:00:00Z",
    status: "completed",
  },
  {
    id: "t4",
    label: "Pengambilan Barang",
    description: "Dijadwalkan untuk 10 Agustus 2026",
    timestamp: undefined,
    status: "current",
  },
  {
    id: "t5",
    label: "Transaksi Selesai",
    description: "Menunggu konfirmasi pengambilan",
    timestamp: undefined,
    status: "pending",
  },
];

export const transactions: Transaction[] = [
  {
    id: "tx1",
    listingId: "l4",
    listing: listings[3],
    farmerId: "u1",
    farmer: currentUser,
    tengkulakId: "u2",
    tengkulak: users[1],
    agreedPrice: 8000,
    volume: 800,
    unit: "kg",
    commodity: commodities[3],
    status: "pickup_scheduled",
    pickupDate: "2026-08-10",
    pickupLocation: "Brebes, Jawa Tengah",
    confirmedAt: "2026-08-06T11:00:00Z",
    contractNumber: "HV-2026-0842",
    timeline: transactionTimeline,
  },
  {
    id: "tx2",
    listingId: "l3",
    listing: listings[2],
    farmerId: "u1",
    farmer: currentUser,
    tengkulakId: "u5",
    tengkulak: users[4],
    agreedPrice: 54000,
    volume: 200,
    unit: "kg",
    commodity: commodities[1],
    status: "completed",
    pickupDate: "2026-08-08",
    pickupLocation: "Brebes, Jawa Tengah",
    confirmedAt: "2026-08-07T09:00:00Z",
    completedAt: "2026-08-08T14:00:00Z",
    contractNumber: "HV-2026-0839",
    timeline: [
      {
        id: "t1",
        label: "Kesepakatan Harga",
        description: "Harga disepakati",
        timestamp: "2026-08-07T08:00:00Z",
        status: "completed",
      },
      {
        id: "t2",
        label: "Konfirmasi Kedua Pihak",
        description: "Dikonfirmasi",
        timestamp: "2026-08-07T09:00:00Z",
        status: "completed",
      },
      {
        id: "t3",
        label: "Pengambilan Barang",
        description: "Barang diambil",
        timestamp: "2026-08-08T14:00:00Z",
        status: "completed",
      },
      {
        id: "t4",
        label: "Transaksi Selesai",
        description: "Selesai",
        timestamp: "2026-08-08T14:30:00Z",
        status: "completed",
      },
    ],
  },
];

// ============================================================
// Reviews
// ============================================================
export const reviews: Review[] = [
  {
    id: "r1",
    transactionId: "tx2",
    reviewerId: "u5",
    reviewer: users[4],
    targetId: "u1",
    rating: 5,
    comment: "Kualitas cabai rawit sangat bagus. Sesuai dengan grade A yang dijanjikan. Pasti akan beli lagi.",
    createdAt: "2026-08-09T10:00:00Z",
  },
  {
    id: "r2",
    transactionId: "tx2",
    reviewerId: "u1",
    reviewer: currentUser,
    targetId: "u5",
    rating: 4,
    comment: "Pembayaran tepat waktu. Proses pengambilan lancar.",
    createdAt: "2026-08-09T11:00:00Z",
  },
  {
    id: "r3",
    transactionId: "tx1",
    reviewerId: "u2",
    reviewer: users[1],
    targetId: "u1",
    rating: 5,
    comment: "Pak Mulyono selalu menyediakan komoditas berkualitas. Recommended!",
    createdAt: "2026-08-01T08:00:00Z",
  },
];

// ============================================================
// Chat Previews
// ============================================================
export const chatPreviews: ChatPreview[] = [
  {
    id: "chat1",
    participant: users[1],
    lastMessage: "Baik Pak, saya akan ambil hari Sabtu ya",
    timestamp: "2026-08-13T09:30:00Z",
    unread: 2,
  },
  {
    id: "chat2",
    participant: users[2],
    lastMessage: "Apakah masih tersedia bawang merahnya?",
    timestamp: "2026-08-13T08:15:00Z",
    unread: 0,
  },
  {
    id: "chat3",
    participant: users[4],
    lastMessage: "Terima kasih Pak, transaksi sudah selesai",
    timestamp: "2026-08-12T16:00:00Z",
    unread: 0,
  },
];

// ============================================================
// Chat Messages
// ============================================================
export const chatMessages: Record<string, Message[]> = {
  chat1: [
    {
      id: "m1",
      chatId: "chat1",
      senderId: "u1",
      text: "Selamat pagi Pak Haji, bawang merah saya sudah siap panen 500kg",
      timestamp: "2026-08-13T07:00:00Z",
      type: "text",
    },
    {
      id: "m2",
      chatId: "chat1",
      senderId: "u2",
      text: "Pagi Pak Mulyono. Grade A ya? Saya tertarik",
      timestamp: "2026-08-13T07:15:00Z",
      type: "text",
    },
    {
      id: "m3",
      chatId: "chat1",
      senderId: "u1",
      text: "Betul Pak, sudah di-scan pakai Hubvest, hasilnya Grade A confidence 95%",
      timestamp: "2026-08-13T07:20:00Z",
      type: "text",
    },
    {
      id: "m4",
      chatId: "chat1",
      senderId: "u2",
      text: "Wah bagus. Saya tawar Rp30.000/kg untuk 500kg. Gimana?",
      timestamp: "2026-08-13T08:00:00Z",
      type: "text",
    },
    {
      id: "m5",
      chatId: "chat1",
      senderId: "u1",
      text: "Deal Pak, Rp30.000/kg. Kapan bisa diambil?",
      timestamp: "2026-08-13T08:30:00Z",
      type: "text",
    },
    {
      id: "m6",
      chatId: "chat1",
      senderId: "u2",
      text: "Baik Pak, saya akan ambil hari Sabtu ya",
      timestamp: "2026-08-13T09:30:00Z",
      type: "text",
    },
  ],
  chat2: [
    {
      id: "m7",
      chatId: "chat2",
      senderId: "u3",
      text: "Apakah masih tersedia bawang merahnya?",
      timestamp: "2026-08-13T08:15:00Z",
      type: "text",
    },
  ],
};

// ============================================================
// Mock CV Scan Result
// ============================================================
export const mockScanResult: GradeResult = {
  grade: "A",
  confidence: 95,
  label: "Sangat Baik",
  description:
    "Komoditas dalam kondisi sangat baik. Ukuran seragam, warna cerah, dan tidak ditemukan cacat signifikan.",
  attributes: [
    { name: "Kesegaran", value: "Sangat Segar", score: 96, icon: "🌿" },
    { name: "Ukuran", value: "Seragam", score: 92, icon: "📏" },
    { name: "Warna", value: "Cerah Merata", score: 94, icon: "🎨" },
    { name: "Cacat", value: "Minimal", score: 97, icon: "✅" },
  ],
  commodityName: "Bawang Merah",
  imageUrl: "/images/commodities/bawang-merah.jpg",
  timestamp: "2026-08-13T10:00:00Z",
};
