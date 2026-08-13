import React, { useState } from 'react';
import {
  TabType,
  Commodity,
  FarmerListing,
  OrderItem,
  NotificationItem,
  HandshakeReceiptData,
  ScreenView,
} from './types';
import {
  INITIAL_COMMODITIES,
  INITIAL_FARMER_LISTINGS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MarketView } from './components/MarketView';
import { OrdersView } from './components/OrdersView';
import { ProfileView } from './components/ProfileView';

import { BiddingView } from './components/BiddingView';
import { ReceiptView } from './components/ReceiptView';
import { TransactionDetailView } from './components/TransactionDetailView';
import { ReviewView } from './components/ReviewView';

import { CatatPanenModal } from './components/CatatPanenModal';
import { CommodityDetailModal } from './components/CommodityDetailModal';
import { FarmerDetailModal } from './components/FarmerDetailModal';
import { LocationModal } from './components/LocationModal';
import { NotificationModal } from './components/NotificationModal';

export default function App() {
  const [screenView, setScreenView] = useState<ScreenView>({ type: 'TAB', tab: 'HOME' });
  const [currentLocation, setCurrentLocation] = useState('Brebes, Jawa Tengah');

  const [commodities, setCommodities] = useState<Commodity[]>(INITIAL_COMMODITIES);
  const [farmerListings, setFarmerListings] = useState<FarmerListing[]>(INITIAL_FARMER_LISTINGS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [isCatatPanenOpen, setIsCatatPanenOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerListing | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Handlers
  const handleSaveHarvest = (newListing: FarmerListing) => {
    setFarmerListings([newListing, ...farmerListings]);
  };

  const handleOpenBidding = (farmer: FarmerListing) => {
    setSelectedFarmer(null);
    setScreenView({ type: 'BIDDING', listing: farmer });
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

  const handleBiddingComplete = (receiptData: HandshakeReceiptData) => {
    // Add to orders
    const newOrder: OrderItem = {
      id: receiptData.contractId,
      farmerName: 'Pak Slamet Rahardjo',
      farmerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      commodityName: receiptData.commodityName,
      commodityPhoto: receiptData.commodityPhoto,
      quantity: `${receiptData.volumeKg} Kg`,
      offeredPrice: receiptData.finalPrice / receiptData.volumeKg,
      totalPrice: receiptData.finalPrice,
      status: 'Menunggu Pickup',
      date: 'Hari ini',
      location: 'Wanasari, Brebes',
      note: 'Konfirmasi Digital Handshake Selesai',
      buyerName: 'Budi Santoso',
      buyerRole: 'TENGKULAK PREMIUM',
      buyerVehicle: 'Truk Engkel • B 9921 KIZ',
    };

    setOrders([newOrder, ...orders]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Digital Handshake Berhasil! 🎉',
      message: `Kontrak ${receiptData.contractId} disetujui. Siap pickup tanggal ${receiptData.pickupDate}.`,
      time: 'Baru saja',
      read: false,
      type: 'offer',
    };

    setNotifications([newNotif, ...notifications]);

    // Go to Receipt screen
    setScreenView({ type: 'RECEIPT', receipt: receiptData });
  };

  const handleConfirmPickupAndReview = (order: OrderItem) => {
    // Update order status to Selesai
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'Selesai' } : o))
    );
    // Go to Review Screen
    setScreenView({ type: 'REVIEW', order });
  };

  const handleReviewSubmitted = (rating: number, comment: string) => {
    alert(`Terima kasih! Ulasan ${rating} bintang berhasil dikirim ke mitra pertanian.`);
    setScreenView({ type: 'TAB', tab: 'ORDERS' });
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotifRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const currentTab = screenView.type === 'TAB' ? screenView.tab : 'HOME';

  return (
    <MobileFrame>
      <div id="app-root-frame" className="min-h-full flex flex-col bg-[#F8F9FA] relative">
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
              onCatatPanenClick={() => setIsCatatPanenOpen(true)}
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
              onBack={() => setScreenView({ type: 'TAB', tab: 'HOME' })}
              onSubmitOffer={handleBiddingComplete}
            />
          )}

          {/* Screen 4: Digital Handshake Receipt */}
          {screenView.type === 'RECEIPT' && (
            <ReceiptView
              receipt={screenView.receipt}
              onGoToOrders={() => setScreenView({ type: 'TAB', tab: 'ORDERS' })}
              onOpenPickupDetail={() => {
                const targetOrder = orders[0] || INITIAL_ORDERS[0];
                setScreenView({ type: 'TRANSACTION_DETAIL', order: targetOrder });
              }}
            />
          )}

          {/* Screen 6: Transaction Detail / Konfirmasi Pengambilan */}
          {screenView.type === 'TRANSACTION_DETAIL' && (
            <TransactionDetailView
              order={screenView.order}
              onBack={() => setScreenView({ type: 'TAB', tab: 'ORDERS' })}
              onConfirmPickup={() => handleConfirmPickupAndReview(screenView.order)}
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
        <CatatPanenModal
          isOpen={isCatatPanenOpen}
          onClose={() => setIsCatatPanenOpen(false)}
          onSave={handleSaveHarvest}
        />

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
