from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...db.database import get_db
from ...db.models import MarketPrice, Commodity
from typing import List

router = APIRouter()

@router.get("/")
def get_market_prices(db: Session = Depends(get_db)):
    """
    Get current market reference prices for all commodities.
    """
    prices = db.query(MarketPrice).all()
    result = []
    for price in prices:
        result.append({
            "id": price.id,
            "commodity": price.commodity.name if price.commodity else "Unknown",
            "icon": price.commodity.icon if price.commodity else None,
            "price": price.price,
            "location": price.location,
            "trend": price.trend,
            "date": price.date
        })
    return result
