from pydantic import BaseModel, ConfigDict
from datetime import datetime

class ListingBase(BaseModel):
    commodity_id: int
    farmer_id: int
    quantity: float
    price_per_unit: float
    status: str = "active"

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
