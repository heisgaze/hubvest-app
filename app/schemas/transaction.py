from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TransactionBase(BaseModel):
    listing_id: int
    buyer_id: int
    final_price: float
    status: str = "completed"

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
