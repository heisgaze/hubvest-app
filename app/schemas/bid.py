from pydantic import BaseModel, ConfigDict
from datetime import datetime

class BidBase(BaseModel):
    listing_id: int
    buyer_id: int
    bid_amount: float
    status: str = "pending"

class BidCreate(BidBase):
    pass

class BidResponse(BidBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
