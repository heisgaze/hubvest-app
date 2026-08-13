import uuid
import enum
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Enum, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class RoleEnum(str, enum.Enum):
    farmer = "farmer"
    tengkulak = "tengkulak"

class ListingStatusEnum(str, enum.Enum):
    active = "active"
    pending = "pending"
    sold = "sold"

class BidStatusEnum(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"

class TransactionStatusEnum(str, enum.Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"
    
class TrendEnum(str, enum.Enum):
    up = "up"
    down = "down"
    stable = "stable"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    location = Column(String)
    rating = Column(Float, default=0.0)
    total_transactions = Column(Integer, default=0)
    joined_date = Column(DateTime, server_default=func.now())

    listings = relationship("Listing", back_populates="seller")
    bids = relationship("Bid", back_populates="bidder")
    
class Commodity(Base):
    __tablename__ = "commodities"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    icon = Column(String)

class MarketPrice(Base):
    __tablename__ = "market_prices"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    commodity_id = Column(String, ForeignKey("commodities.id"))
    price = Column(Float, nullable=False)
    trend = Column(Enum(TrendEnum))
    date = Column(DateTime, server_default=func.now())
    location = Column(String)

class Listing(Base):
    __tablename__ = "listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    commodity_id = Column(String, ForeignKey("commodities.id"))
    title = Column(String, nullable=False)
    quantity = Column(Float, nullable=False) # e.g. in kg
    unit = Column(String, default="kg")
    price = Column(Float, nullable=False) # e.g. per kg
    location = Column(String)
    status = Column(Enum(ListingStatusEnum), default=ListingStatusEnum.active)
    created_at = Column(DateTime, server_default=func.now())
    grade = Column(String)
    description = Column(Text)
    
    seller = relationship("User", back_populates="listings")
    commodity = relationship("Commodity")
    bids = relationship("Bid", back_populates="listing")

class Bid(Base):
    __tablename__ = "bids"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"))
    bidder_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    status = Column(Enum(BidStatusEnum), default=BidStatusEnum.pending)
    created_at = Column(DateTime, server_default=func.now())
    
    listing = relationship("Listing", back_populates="bids")
    bidder = relationship("User", back_populates="bids")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"))
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    status = Column(Enum(TransactionStatusEnum), default=TransactionStatusEnum.pending)
    created_at = Column(DateTime, server_default=func.now())
    
    listing = relationship("Listing")
    buyer = relationship("User")
