from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.api.dependencies import get_db
from app.db.models import MarketPrice
from app.schemas.schemas import MarketPriceBase

router = APIRouter(prefix="/api/v1/harga", tags=["Market Prices"])

@router.get("/", response_model=List[MarketPriceBase])
async def get_market_prices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MarketPrice))
    prices = result.scalars().all()
    return prices
