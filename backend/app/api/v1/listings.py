from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from uuid import UUID

from app.api.dependencies import get_db, get_current_user
from app.db.models import Listing, User, Bid
from app.schemas.schemas import ListingResponse, ListingCreate, BidCreate, BidResponse

router = APIRouter(prefix="/api/v1/listings", tags=["Listings"])

@router.get("/", response_model=List[ListingResponse])
async def get_listings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Listing)
        .where(Listing.status == "active")
        .options(selectinload(Listing.commodity), selectinload(Listing.bids))
    )
    return result.scalars().all()

@router.post("/", response_model=ListingResponse)
async def create_listing(
    listing_in: ListingCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "farmer":
        raise HTTPException(status_code=403, detail="Only farmers can create listings")
        
    db_listing = Listing(
        seller_id=current_user.id,
        **listing_in.model_dump()
    )
    db.add(db_listing)
    await db.commit()
    await db.refresh(db_listing)
    
    # Reload with relations
    result = await db.execute(
        select(Listing)
        .where(Listing.id == db_listing.id)
        .options(selectinload(Listing.commodity), selectinload(Listing.bids))
    )
    return result.scalar_one()

@router.get("/{id}", response_model=ListingResponse)
async def get_listing(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Listing)
        .where(Listing.id == id)
        .options(selectinload(Listing.commodity), selectinload(Listing.bids))
    )
    listing = result.scalar_one_or_none()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.post("/{id}/bids", response_model=BidResponse)
async def create_bid(
    id: UUID,
    bid_in: BidCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != "tengkulak":
        raise HTTPException(status_code=403, detail="Only tengkulak can bid")
        
    listing_result = await db.execute(select(Listing).where(Listing.id == id))
    listing = listing_result.scalar_one_or_none()
    if not listing or listing.status != "active":
        raise HTTPException(status_code=404, detail="Active listing not found")
        
    db_bid = Bid(
        listing_id=id,
        bidder_id=current_user.id,
        amount=bid_in.amount
    )
    db.add(db_bid)
    await db.commit()
    await db.refresh(db_bid)
    return db_bid
