from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False) # 'petani' or 'tengkulak'
    avatar = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    rating = Column(Float, default=0.0)
    total_transactions = Column(Integer, default=0)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Commodity(Base):
    __tablename__ = "commodities"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    icon = Column(String, nullable=True)
    
class MarketPrice(Base):
    __tablename__ = "market_prices"
    id = Column(String, primary_key=True, default=generate_uuid)
    commodity_id = Column(String, ForeignKey("commodities.id"))
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    trend = Column(String, default="up") # "up", "down", "stable"
    
    commodity = relationship("Commodity")

class Listing(Base):
    __tablename__ = "listings"
    id = Column(String, primary_key=True, default=generate_uuid)
    seller_id = Column(String, ForeignKey("users.id"))
    commodity_id = Column(String, ForeignKey("commodities.id"))
    title = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String, default="Kg")
    price = Column(Float, nullable=False) # estimated/reference price by farmer
    location = Column(String, nullable=False)
    status = Column(String, default="open") # open, locked, completed
    grade = Column(String, nullable=True) # A, B, C from CV
    description = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    seller = relationship("User", foreign_keys=[seller_id])
    commodity = relationship("Commodity")
    bids = relationship("Bid", back_populates="listing")

class Bid(Base):
    __tablename__ = "bids"
    id = Column(String, primary_key=True, default=generate_uuid)
    listing_id = Column(String, ForeignKey("listings.id"))
    bidder_id = Column(String, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending") # pending, accepted, rejected
    pfi_score = Column(Float, nullable=True) # Price Fairness Index
    pfi_color = Column(String, nullable=True) # red, yellow, green
    created_at = Column(DateTime, default=datetime.utcnow)
    
    listing = relationship("Listing", back_populates="bids")
    bidder = relationship("User", foreign_keys=[bidder_id])

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String, primary_key=True, default=generate_uuid)
    listing_id = Column(String, ForeignKey("listings.id"))
    bid_id = Column(String, ForeignKey("bids.id"))
    seller_id = Column(String, ForeignKey("users.id"))
    buyer_id = Column(String, ForeignKey("users.id"))
    final_price = Column(Float, nullable=False)
    status = Column(String, default="waiting_pickup") # waiting_pickup, completed
    meeting_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    listing = relationship("Listing")
    bid = relationship("Bid")
    seller = relationship("User", foreign_keys=[seller_id])
    buyer = relationship("User", foreign_keys=[buyer_id])

class Review(Base):
    __tablename__ = "reviews"
    id = Column(String, primary_key=True, default=generate_uuid)
    transaction_id = Column(String, ForeignKey("transactions.id"))
    reviewer_id = Column(String, ForeignKey("users.id"))
    reviewee_id = Column(String, ForeignKey("users.id"))
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
