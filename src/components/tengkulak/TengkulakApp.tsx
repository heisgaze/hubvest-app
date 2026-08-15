"use client";

import React, { useState } from 'react';
import {
  TabType,
  Commodity,
  FarmerListing,
  OrderItem,
  NotificationItem,
  HandshakeReceiptData,
  ScreenView,
} from "@/components/tengkulak/types";
// No mock data imported

import { MobileFrame } from "@/components/common/MobileFrame";
import { Header } from "@/components/tengkulak/ui/Header";
import { BottomNav } from "@/components/tengkulak/ui/TengkulakBottomNav";
import { HomeView } from "@/components/tengkulak/views/HomeView";
import { MarketView } from "@/components/tengkulak/views/MarketView";
import { OrdersView } from "@/components/tengkulak/views/OrdersView";
import { ProfileView } from "@/components/tengkulak/views/ProfileView";

import { ReviewView } from "@/components/tengkulak/views/ReviewView";
import { BiddingView } from "@/components/tengkulak/views/BiddingView";
import { ReceiptView } from "@/components/tengkulak/views/ReceiptView";
import { TransactionDetailView } from "@/components/tengkulak/views/TransactionDetailView";

import { fetchListings, submitBid, fetchMyBids, fetchMyTransactions, cancelTransaction, fetchMarketPrices, completeTransaction, submitReview } from "@/lib/api";

import { CommodityDetailModal } from "@/components/tengkulak/modals/CommodityDetailModal";
import { FarmerDetailModal } from "@/components/tengkulak/modals/FarmerDetailModal";
import { LocationModal } from "@/components/tengkulak/modals/LocationModal";
import { NotificationModal } from "@/components/tengkulak/modals/NotificationModal";

export default function TengkulakApp() {
  const [screenView, setScreenView] = useState<ScreenView>({ type: 'TAB', tab: 'HOME' });
  const [currentLocation, setCurrentLocation] = useState('Brebes, Jawa Tengah');

  const [commodities, setCommodities] = useState<Commodity[]>([
    {
      id: 'c1',
      name: 'Bawang Merah',
      category: 'Sayuran',
      price: 25000,
      unit: 'Kg',
      changePercent: 0,
      isUp: true,
      color: '#ef4444',
      iconType: 'bawang',
      iconBg: '#fee2e2',
      sparkline: [24000, 24500, 24800, 25000],
      marketPrices: [
        { location: 'Brebes', price: 25000, updatedAt: 'Hari ini, 08:00' },
        { location: 'Bandung', price: 28000, updatedAt: 'Hari ini, 07:30' },
        { location: 'Nganjuk', price: 24500, updatedAt: 'Hari ini, 09:00' },
        { location: 'Enrekang', price: 23000, updatedAt: 'Hari ini, 10:00' }
      ],
      description: 'Bawang merah berkualitas tinggi dari Brebes.',
      qualityGrade: 'Grade A'
    },
    {
      id: 'c2',
      name: 'Cabai Rawit Merah',
      category: 'Sayuran',
      price: 45000,
      unit: 'Kg',
      changePercent: 5.5,
      isUp: true,
      color: '#dc2626',
      iconType: 'cabai',
      iconBg: '#fef2f2',
      sparkline: [40000, 42000, 44000, 45000],
      marketPrices: [
        { location: 'Garut', price: 45000, updatedAt: 'Hari ini, 08:00' },
        { location: 'Kediri', price: 42000, updatedAt: 'Hari ini, 09:30' },
        { location: 'Bandung', price: 48000, updatedAt: 'Hari ini, 10:15' }
      ],
      description: 'Cabai rawit merah pedas segar, cocok untuk industri sambal.',
      qualityGrade: 'Grade A'
    },
    {
      id: 'c3',
      name: 'Beras Medium',
      category: 'Pangan',
      price: 14000,
      unit: 'Kg',
      changePercent: -1.2,
      isUp: false,
      color: '#f97316',
      iconType: 'beras',
      iconBg: '#ffedd5',
      sparkline: [14200, 14100, 14050, 14000],
      marketPrices: [
        { location: 'Indramayu', price: 14000, updatedAt: 'Hari ini, 07:45' },
        { location: 'Cianjur', price: 14500, updatedAt: 'Hari ini, 08:15' },
        { location: 'Ngawi', price: 13800, updatedAt: 'Hari ini, 09:00' }
      ],
      description: 'Beras medium pulen pilihan langsung dari petani.',
      qualityGrade: 'Grade B'
    },
    {
      id: 'c4',
      name: 'Tomat',
      category: 'Sayuran',
      price: 8500,
      unit: 'Kg',
      changePercent: -3.5,
      isUp: false,
      color: '#94a3b8',
      iconType: 'tomat',
      iconBg: '#f1f5f9',
      sparkline: [9500, 9000, 8800, 8500],
      marketPrices: [
        { location: 'Malang', price: 8500, updatedAt: 'Hari ini, 06:00' },
        { location: 'Bandung', price: 9000, updatedAt: 'Hari ini, 07:00' }
      ],
      description: 'Tomat segar pilihan langsung dari petani.',
      qualityGrade: 'Grade A'
    },
    {
      id: 'c5',
      name: 'Kentang Dieng',
      category: 'Sayuran',
      price: 15000,
      unit: 'Kg',
      changePercent: 1.5,
      isUp: true,
      color: '#eab308',
      iconType: 'kentang',
      iconBg: '#fef9c3',
      sparkline: [14000, 14500, 14800, 15000],
      marketPrices: [
        { location: 'Wonosobo', price: 15000, updatedAt: 'Hari ini, 07:15' },
        { location: 'Pangalengan', price: 15500, updatedAt: 'Hari ini, 08:30' }
      ],
      description: 'Kentang Dieng ukuran besar, mulus dan minim cacat.',
      qualityGrade: 'Grade A'
    }
  ]);
  const [farmerListings, setFarmerListings] = useState<FarmerListing[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load listings from Backend
  React.useEffect(() => {
    const loadMarketData = async () => {
      const apiPrices = await fetchMarketPrices();
      if (apiPrices && apiPrices.length > 0) {
        setCommodities(prev => prev.map(c => {
          const pricesForCommodity = apiPrices.filter(p => p.commodity.name.toLowerCase().includes(c.name.toLowerCase()));
          if (pricesForCommodity.length > 0) {
            return {
              ...c,
              price: pricesForCommodity[0].producerPrice,
              changePercent: pricesForCommodity[0].trend === 'up' ? 2.5 : pricesForCommodity[0].trend === 'down' ? -1.5 : 0,
              isUp: pricesForCommodity[0].trend === 'up' || pricesForCommodity[0].trend === 'stable',
              marketPrices: pricesForCommodity.map(p => ({
                location: p.location,
                price: p.producerPrice,
                updatedAt: 'Hari ini'
              }))
            };
          }
          return c;
        }));
      }
    };
    loadMarketData();

    fetchListings("open").then((listings) => {
      const mapped = listings.map(l => ({
        id: l.id,
        farmerName: l.farmer.name,
        farmerPhoto: l.farmer.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
        commodityName: l.commodity.name,
        commodityPhoto: (l.images && l.images.length > 0) ? l.images[0] : "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&q=80&w=800",
        location: l.location,
        distance: "12 km",
        estimatedPrice: l.minPrice,
        volume: l.volume.toString(),
        unit: l.unit,
        rating: l.farmer.rating,
        timeAgo: "Baru saja",
        badge: l.grade as any || "B",
        commodityIcon: '🧅', // Mocked for UI requirements
        amount: `${l.volume} ${l.unit}`,
        date: l.harvestDate,
        buyersCount: l.bidCount,
        minOrder: 100,
        estimatedTotal: l.minPrice * l.volume,
        isVerified: l.farmer.verified,
        isHot: l.bidCount > 2
      }));
      setFarmerListings(mapped as any);
    });

    const loadOrders = async () => {
      const myBids = await fetchMyBids();
      const myTransactions = await fetchMyTransactions();

      const mappedBids = myBids.map((b: any) => ({
        id: b.listingId,
        farmerId: b.listing?.farmerId || "u1",
        farmerName: b.listing?.farmer?.name || "Petani", 
        farmerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
        commodityName: "Komoditas",
        quantity: "100 Kg", 
        offeredPrice: b.amount,
        totalPrice: b.amount * 100,
        status: b.status === "pending" ? "Menunggu Konfirmasi" : b.status === "rejected" ? "Dibatalkan" : "Selesai",
        date: "Hari ini",
        location: "Wanasari, Brebes",
        note: "Menunggu petani menyetujui tawaran",
        buyerName: "Budi Santoso",
        buyerRole: "TENGKULAK PREMIUM",
        buyerVehicle: "Truk Engkel • B 9921 KIZ",
      }));

      const mappedTrans = myTransactions.map((t: any) => ({
        id: t.id,
        farmerId: t.farmerId || t.farmer?.id || "u1",
        farmerName: t.farmer?.name || "Petani",
        farmerPhoto: t.farmer?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
        commodityName: t.commodity?.name || "Sayuran",
        quantity: `${t.volume} Kg`,
        offeredPrice: t.agreedPrice,
        totalPrice: t.agreedPrice * t.volume,
        status: t.status === "waiting_pickup" ? "Menunggu Pickup" : "Selesai",
        date: "Hari ini",
        location: t.pickupLocation,
        note: "Transaksi telah disetujui",
        buyerName: "Budi Santoso",
        buyerRole: "TENGKULAK PREMIUM",
        buyerVehicle: "Truk Engkel • B 9921 KIZ",
      }));

      setOrders([...mappedTrans, ...mappedBids] as OrderItem[]);
    };
    loadOrders();
  }, []);

  // Modals
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerListing | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Handlers
  const handleOpenBidding = (farmer: FarmerListing) => {
    setSelectedFarmer(null);
    const prevTab = screenView.type === 'TAB' ? screenView.tab : 'HOME';
    setScreenView({ type: 'BIDDING', listing: farmer, previousTab: prevTab });
  };

  const handleSubmitOffer = (farmer: FarmerListing, quantityStr: string, offerPrice: number) => {
    const qty = parseInt(quantityStr, 10) || 100;
    const newOrder: OrderItem = {
      id: `HB-${Math.floor(1000 + Math.random() * 9000)}-BS`,
      farmerName: farmer.farmerName,
      farmerPhoto: farmer.farmerPhoto,
      commodityName: farmer.commodityName,
      quantity: `${qty} Kg`,
      offeredPrice: offerPrice,
      totalPrice: qty * offerPrice,
      status: 'Menunggu Pickup',
      date: 'Hari ini',
      location: farmer.location,
      note: 'Digital Handshake Berhasil Disepakati',
      buyerName: 'Budi Santoso',
      buyerRole: 'TENGKULAK PREMIUM',
      buyerVehicle: 'Truk Engkel • B 9921 KIZ',
    };

    setOrders([newOrder, ...orders]);
  };

  const handleBiddingComplete = async (receiptData: HandshakeReceiptData) => {
    // 1. Call Backend to submit Bid
    const listingId = screenView.type === 'BIDDING' ? screenView.listing.id : 'unknown';
    const res = await submitBid(listingId, receiptData.finalPrice / receiptData.volumeKg);
    
    if (!res.success) {
      alert("Gagal menawar: " + res.message);
      return;
    }

    // Add to orders as pending bid
    const newOrder: OrderItem = {
      id: `BID-${Date.now()}`,
      farmerName: 'Pak Slamet Rahardjo',
      farmerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      commodityName: receiptData.commodityName,
      commodityPhoto: receiptData.commodityPhoto,
      quantity: `${receiptData.volumeKg} Kg`,
      offeredPrice: receiptData.finalPrice / receiptData.volumeKg,
      totalPrice: receiptData.finalPrice,
      status: 'Menunggu Konfirmasi',
      date: 'Hari ini',
      location: 'Wanasari, Brebes',
      note: 'Penawaran berhasil dikirim. Menunggu persetujuan petani.',
      buyerName: 'Budi Santoso',
      buyerRole: 'TENGKULAK PREMIUM',
      buyerVehicle: 'Truk Engkel • B 9921 KIZ',
    };

    setOrders([newOrder, ...orders]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Tawaran Terkirim! 🎉',
      message: `Tawaran Anda sebesar Rp ${(receiptData.finalPrice / receiptData.volumeKg).toLocaleString('id-ID')} berhasil dikirim ke petani.`,
      time: 'Baru saja',
      read: false,
      type: 'offer',
    };

    setNotifications([newNotif, ...notifications]);

    // Go to Orders screen instead of Receipt
    setScreenView({ type: 'TAB', tab: 'ORDERS' });
  };

  const handleConfirmPickupAndReview = async (order: OrderItem) => {
    // API Call to complete transaction
    const res = await completeTransaction(order.id, "t1");
    if (!res.success) {
      alert("Gagal menyelesaikan transaksi: " + res.message);
      return;
    }

    // Update order status to Selesai locally
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'Selesai' } : o))
    );
    // Go to Review Screen
    setScreenView({ type: 'REVIEW', order });
  };

  const handleReviewSubmitted = async (rating: number, comment: string) => {
    if (screenView.type !== 'REVIEW') return;
    
    // Attempt to extract farmer ID. Since OrderItem doesn't store farmer ID natively right now,
    // we use a dummy farmer ID for demonstration, but it should be passed from the actual transaction.
    // In our DB, "5a351aad-6070-4264-a6e0-bed3232ab399" is the default Petani.
    const res = await submitReview(screenView.order.id, screenView.order.farmerId || "u1", rating, comment, "t1");
    
    if (!res.success) {
      alert("Gagal mengirim ulasan: " + res.message);
      return;
    }

    alert(`Terima kasih! Ulasan ${rating} bintang berhasil dikirim ke mitra pertanian.`);
    setScreenView({ type: 'TAB', tab: 'ORDERS' });
  };
  
  const handleCancelTransaction = async (order: OrderItem) => {
    const res = await cancelTransaction(order.id);
    if (res.success) {
      alert("Transaksi berhasil dibatalkan.");
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: 'Dibatalkan' } : o))
      );
      setScreenView({ type: 'TAB', tab: 'ORDERS' });
    } else {
      alert("Gagal membatalkan transaksi: " + res.message);
    }
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotifRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const currentTab = screenView.type === 'TAB' ? screenView.tab : 'HOME';

  return (
    <MobileFrame>
      <div id="app-root-frame" className="min-h-screen flex flex-col bg-[#F8F9FA] relative">
        {/* Render Header only when in TAB view */}
        {screenView.type === 'TAB' && (
          <Header
            location={currentLocation}
            unreadCount={unreadNotifCount}
            currentTab={currentTab}
            onLocationClick={() => setIsLocationOpen(true)}
            onNotificationClick={() => setIsNotificationOpen(true)}
            onProfileClick={() => setScreenView({ type: 'TAB', tab: 'PROFILE' })}
          />
        )}

        {/* Dynamic Screen Router */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          {screenView.type === 'TAB' && screenView.tab === 'HOME' && (
            <HomeView
              commodities={commodities}
              farmerListings={farmerListings}
              onLihatSemuaClick={() => setScreenView({ type: 'TAB', tab: 'MARKET' })}
              onCommodityClick={(c) => setSelectedCommodity(c)}
              onFarmerClick={(f) => handleOpenBidding(f)}
            />
          )}

          {screenView.type === 'TAB' && screenView.tab === 'MARKET' && (
            <MarketView
              farmerListings={farmerListings}
              commodities={commodities}
              onFarmerClick={(f) => handleOpenBidding(f)}
              onCommoditySelect={(c) => setSelectedCommodity(c)}
            />
          )}

          {screenView.type === 'TAB' && screenView.tab === 'ORDERS' && (
            <OrdersView
              orders={orders}
              onSelectOrder={(order) => {
                if (order.status === 'Menunggu Pickup') {
                  setScreenView({ type: 'TRANSACTION_DETAIL', order });
                } else {
                  setScreenView({ type: 'REVIEW', order });
                }
              }}
            />
          )}

          {screenView.type === 'TAB' && screenView.tab === 'PROFILE' && (
            <ProfileView
              location={currentLocation}
              onLocationClick={() => setIsLocationOpen(true)}
              myListingsCount={farmerListings.length}
            />
          )}

          {/* Screen 3: Live Bidding */}
          {screenView.type === 'BIDDING' && (
            <BiddingView
              listing={screenView.listing}
              onBack={() => setScreenView({ type: 'TAB', tab: screenView.previousTab || 'HOME' })}
              onSubmitOffer={handleBiddingComplete}
            />
          )}

          {/* Screen 4: Digital Handshake Receipt */}
          {screenView.type === 'RECEIPT' && (
            <ReceiptView
              receipt={screenView.receipt}
              onGoToOrders={() => setScreenView({ type: 'TAB', tab: 'ORDERS' })}
              onOpenPickupDetail={() => {
                if (orders.length > 0) {
                  setScreenView({ type: 'TRANSACTION_DETAIL', order: orders[0] });
                }
              }}
            />
          )}

          {/* Screen 6: Transaction Detail / Konfirmasi Pengambilan */}
          {screenView.type === 'TRANSACTION_DETAIL' && (
            <TransactionDetailView
              order={screenView.order}
              onBack={() => setScreenView({ type: 'TAB', tab: 'ORDERS' })}
              onConfirmPickup={() => handleConfirmPickupAndReview(screenView.order)}
              onCancel={() => handleCancelTransaction(screenView.order)}
            />
          )}

          {/* Screen 7: Review & Rating */}
          {screenView.type === 'REVIEW' && (
            <ReviewView
              order={screenView.order}
              onBack={() => setScreenView({ type: 'TAB', tab: 'ORDERS' })}
              onSubmitReview={handleReviewSubmitted}
            />
          )}
        </main>

        {/* Render Bottom Navigation only when in TAB view */}
        {screenView.type === 'TAB' && (
          <BottomNav
            activeTab={currentTab}
            onTabChange={(tab) => setScreenView({ type: 'TAB', tab })}
          />
        )}

        {/* Global Modals */}
        <CommodityDetailModal
          commodity={selectedCommodity}
          onClose={() => setSelectedCommodity(null)}
          onTawarClick={() => {
            if (farmerListings.length > 0) {
              handleOpenBidding(farmerListings[0]);
            }
          }}
        />

        <FarmerDetailModal
          farmer={selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
          onSubmitOffer={(farmer, qty, price) => {
            handleSubmitOffer(farmer, qty, price);
            handleOpenBidding(farmer);
          }}
        />

        <LocationModal
          isOpen={isLocationOpen}
          currentLocation={currentLocation}
          onClose={() => setIsLocationOpen(false)}
          onSelectLocation={(loc) => setCurrentLocation(loc)}
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          notifications={notifications}
          onClose={() => setIsNotificationOpen(false)}
          onMarkAllRead={handleMarkAllNotifRead}
        />
      </div>
    </MobileFrame>
  );
}
