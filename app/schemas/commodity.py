from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CommodityBase(BaseModel):
    name: str
    description: str | None = None
    unit: str

class CommodityCreate(CommodityBase):
    pass

class CommodityResponse(CommodityBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
