from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...db.database import get_db
from ...db.models import Listing, Commodity, User
from ...schemas import schemas
from typing import List

router = APIRouter()

@router.get("", response_model=List[schemas.Listing])
def get_listings(status: str = "open", db: Session = Depends(get_db)):
    """
    Get all active harvest listings.
    """
    if status == "all":
        listings = db.query(Listing).all()
    else:
        listings = db.query(Listing).filter(Listing.status == status).all()
    return listings

@router.post("", response_model=schemas.Listing)
def create_listing(listing: schemas.ListingCreate, db: Session = Depends(get_db)):
    """
    Create a new listing (Petani).
    """
    db_listing = Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.get("/{id}", response_model=schemas.Listing)
def get_listing(id: str, db: Session = Depends(get_db)):
    """
    Get specific listing details.
    """
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.delete("/{id}")
def delete_listing(id: str, db: Session = Depends(get_db)):
    """
    Delete a specific listing.
    """
    listing = db.query(Listing).filter(Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    # Also delete associated bids, transactions, and reviews to avoid constraint errors
    from app.db.models import Bid, Transaction, Review
    transactions = db.query(Transaction).filter(Transaction.listing_id == id).all()
    transaction_ids = [t.id for t in transactions]
    if transaction_ids:
        db.query(Review).filter(Review.transaction_id.in_(transaction_ids)).delete(synchronize_session=False)
        
    db.query(Transaction).filter(Transaction.listing_id == id).delete()
    db.query(Bid).filter(Bid.listing_id == id).delete()
    
    db.delete(listing)
    db.commit()
    return {"message": "Listing deleted successfully"}
