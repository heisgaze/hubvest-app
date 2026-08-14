from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class User(UserBase):
    id: str
    rating: float
    total_transactions: int
    verified: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class CommodityBase(BaseModel):
    name: str
    icon: Optional[str] = None

class Commodity(CommodityBase):
    id: str
    
    model_config = ConfigDict(from_attributes=True)

class MarketPriceBase(BaseModel):
    commodity_id: str
    location: str
    price: float
    trend: str = "up"

class MarketPrice(MarketPriceBase):
    id: str
    date: datetime
    commodity: Optional[Commodity] = None
    
    model_config = ConfigDict(from_attributes=True)

class ListingBase(BaseModel):
    commodity_id: str
    title: str
    quantity: float
    unit: str = "Kg"
    price: float
    location: str
    description: Optional[str] = None
    grade: Optional[str] = None

class ListingCreate(ListingBase):
    seller_id: str

class Listing(ListingBase):
    id: str
    seller_id: str
    status: str
    created_at: datetime
    seller: Optional[User] = None
    commodity: Optional[Commodity] = None
    
    model_config = ConfigDict(from_attributes=True)

class BidBase(BaseModel):
    listing_id: str
    bidder_id: str
    amount: float

class Bid(BidBase):
    id: str
    status: str
    pfi_score: Optional[float] = None
    pfi_color: Optional[str] = None
    created_at: datetime
    bidder: Optional[User] = None
    
    model_config = ConfigDict(from_attributes=True)

class TransactionBase(BaseModel):
    listing_id: str
    bid_id: str
    seller_id: str
    buyer_id: str
    final_price: float
    meeting_address: Optional[str] = None

class Transaction(TransactionBase):
    id: str
    status: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ReviewBase(BaseModel):
    transaction_id: str
    reviewee_id: str
    rating: int
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    reviewer_id: str

class Review(ReviewBase):
    id: str
    reviewer_id: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
