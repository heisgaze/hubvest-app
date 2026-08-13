from pydantic import BaseModel, ConfigDict
from datetime import datetime

class PriceBase(BaseModel):
    commodity_id: int
    price: float
    market_location: str | None = None

class PriceCreate(PriceBase):
    pass

class PriceResponse(PriceBase):
    id: int
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)
