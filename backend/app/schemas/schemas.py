from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from uuid import UUID

# Shared Config
class OrmBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

# User
class UserBase(OrmBase):
    id: UUID
    name: str
    role: str
    location: Optional[str]
    rating: float
    total_transactions: int
    joined_date: datetime

# Commodity
class CommodityBase(OrmBase):
    id: str
    name: str
    icon: Optional[str]

# Market Price
class MarketPriceBase(OrmBase):
    id: UUID
    commodity_id: str
    price: float
    trend: str
    date: datetime
    location: Optional[str]

# Listing
class ListingBase(OrmBase):
    id: UUID
    seller_id: UUID
    commodity_id: str
    title: str
    quantity: float
    unit: str
    price: float
    location: Optional[str]
    status: str
    created_at: datetime
    grade: Optional[str]
    description: Optional[str]

class ListingCreate(BaseModel):
    commodity_id: str
    title: str
    quantity: float
    unit: str = "kg"
    price: float
    location: Optional[str]
    grade: Optional[str]
    description: Optional[str]

# Bid
class BidBase(OrmBase):
    id: UUID
    listing_id: UUID
    bidder_id: UUID
    amount: float
    status: str
    created_at: datetime

class BidCreate(BaseModel):
    amount: float

# Transaction
class TransactionBase(OrmBase):
    id: UUID
    listing_id: UUID
    buyer_id: UUID
    amount: float
    status: str
    created_at: datetime

# Relations
class BidResponse(BidBase):
    pass

class ListingResponse(ListingBase):
    commodity: CommodityBase
    bids: List[BidResponse] = []

class TransactionResponse(TransactionBase):
    pass
