from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from ...db.database import get_db
from ...db.models import Bid, Listing, MarketPrice, Transaction
from ...schemas import schemas
from typing import List

router = APIRouter()

@router.post("", response_model=schemas.Bid)
def create_bid(bid: schemas.BidBase, db: Session = Depends(get_db)):
    """
    Create a new bid (Tengkulak).
    Includes Price Fairness Index (PFI) guardrail logic.
    """
    # 1. Fetch the listing
    listing = db.query(Listing).filter(Listing.id == bid.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.status != "open":
        raise HTTPException(status_code=400, detail="Listing is no longer open for bidding")

    # 2. Fetch the market price for reference
    market_ref = db.query(MarketPrice).filter(MarketPrice.commodity_id == listing.commodity_id).first()
    ref_price = market_ref.price if market_ref else listing.price # Fallback to farmer's estimated price
    
    # 3. Calculate PFI (Price Fairness Index)
    # PFI = Offered Amount / Reference Price
    pfi_score = bid.amount / ref_price
    
    # 4. Determine PFI Color & Guardrail
    if pfi_score < 0.75:
        # Sinyal Merah -> Block the bid
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Tawaran terlalu rendah (Sinyal Merah). Harga tidak wajar. Skor PFI: {pfi_score:.2f}"
        )
    elif pfi_score < 0.90:
        pfi_color = "yellow"
    else:
        pfi_color = "green"
        
    # 5. Save the bid
    db_bid = Bid(**bid.model_dump(), pfi_score=pfi_score, pfi_color=pfi_color)
    db.add(db_bid)
    db.commit()
    db.refresh(db_bid)
    return db_bid

@router.get("/listing/{listing_id}", response_model=List[schemas.Bid])
def get_bids_for_listing(listing_id: str, db: Session = Depends(get_db)):
    """
    Get all bids for a specific listing (For Petani).
    """
    bids = db.query(Bid).filter(Bid.listing_id == listing_id).order_by(Bid.amount.desc()).all()
    return bids

@router.post("/{bid_id}/accept")
def accept_bid(bid_id: str, db: Session = Depends(get_db)):
    """
    Accept a bid (Petani).
    Atomic transaction:
    - Change bid status to accepted
    - Change all other bids to rejected
    - Change listing status to locked
    - Create a Transaction (Digital Handshake)
    """
    # Use nested transaction / savepoint to ensure atomicity
    try:
        # Fetch the accepted bid
        accepted_bid = db.query(Bid).filter(Bid.id == bid_id).first()
        if not accepted_bid:
            raise HTTPException(status_code=404, detail="Bid not found")
            
        listing_id = accepted_bid.listing_id
        
        # Verify listing is still open
        listing = db.query(Listing).filter(Listing.id == listing_id).first()
        if listing.status != "open":
            raise HTTPException(status_code=400, detail="Listing is already locked or completed")
            
        # Update accepted bid
        accepted_bid.status = "accepted"
        
        # Reject all other bids for this listing
        db.query(Bid).filter(
            Bid.listing_id == listing_id, 
            Bid.id != bid_id
        ).update({"status": "rejected"})
        
        # Lock the listing
        listing.status = "locked"
        
        # Create Digital Handshake (Transaction)
        new_transaction = Transaction(
            listing_id=listing_id,
            bid_id=bid_id,
            seller_id=listing.seller_id,
            buyer_id=accepted_bid.bidder_id,
            final_price=accepted_bid.amount,
            meeting_address=listing.location, # Initial meeting point is listing location
            status="waiting_pickup"
        )
        db.add(new_transaction)
        
        db.commit()
        db.refresh(new_transaction)
        
        return {
            "success": True, 
            "message": "Bid accepted, Digital Handshake created", 
            "transaction_id": new_transaction.id
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{bid_id}/reject")
def reject_bid(bid_id: str, db: Session = Depends(get_db)):
    """
    Reject a bid (Petani).
    """
    bid = db.query(Bid).filter(Bid.id == bid_id).first()
    if not bid:
        raise HTTPException(status_code=404, detail="Bid not found")
        
    bid.status = "rejected"
    db.commit()
    
    return {"success": True, "message": "Bid rejected"}

@router.get("/me/bids", response_model=List[schemas.Bid])
def get_my_bids(request: Request, db: Session = Depends(get_db)):
    """
    Get all bids made by the current Tengkulak.
    """
    user_id = request.headers.get("X-User-Id")
    if not user_id:
        user_id = "c25594e8-7901-40ae-b202-da8d1512990d" # Default Tengkulak
        
    bids = db.query(Bid).filter(Bid.bidder_id == user_id).order_by(Bid.created_at.desc()).all()
    return bids

@router.get("/incoming/bids", response_model=List[schemas.Bid])
def get_incoming_bids(request: Request, db: Session = Depends(get_db)):
    """
    Get all incoming bids for listings owned by the current Petani.
    """
    user_id = request.headers.get("X-User-Id")
    if not user_id:
        user_id = "5a351aad-6070-4264-a6e0-bed3232ab399" # Default Petani
        
    bids = db.query(Bid).join(Listing, Bid.listing_id == Listing.id).filter(
        Listing.seller_id == user_id
    ).order_by(Bid.created_at.desc()).all()
    return bids
