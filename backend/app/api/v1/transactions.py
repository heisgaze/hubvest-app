from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...db.database import get_db
from ...db.models import Transaction, Review, User
from ...schemas import schemas
from typing import List

router = APIRouter()

@router.get("/{id}", response_model=schemas.Transaction)
def get_transaction(id: str, db: Session = Depends(get_db)):
    """
    Get details of a specific Digital Handshake (Transaction).
    """
    transaction = db.query(Transaction).filter(Transaction.id == id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.post("/{id}/complete")
def complete_transaction(id: str, db: Session = Depends(get_db)):
    """
    Mark transaction as completed (Sudah Diambil by Petani).
    """
    transaction = db.query(Transaction).filter(Transaction.id == id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    if transaction.status == "completed":
        raise HTTPException(status_code=400, detail="Transaction is already completed")
        
    transaction.status = "completed"
    
    # Also mark the listing as completed
    transaction.listing.status = "completed"
    
    db.commit()
    return {"success": True, "message": "Transaction marked as completed"}

@router.post("/{id}/reviews", response_model=schemas.Review)
def submit_review(id: str, review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    """
    Submit a review for a transaction.
    """
    # 1. Verify transaction exists and is completed
    transaction = db.query(Transaction).filter(Transaction.id == id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    if transaction.status != "completed":
        raise HTTPException(status_code=400, detail="Cannot review an incomplete transaction")
        
    # 2. Save review
    db_review = Review(**review.model_dump())
    db.add(db_review)
    
    # 3. Update User Rating
    # Calculate new average rating for the reviewee
    reviewee = db.query(User).filter(User.id == review.reviewee_id).first()
    if reviewee:
        current_total = reviewee.total_transactions * reviewee.rating
        reviewee.total_transactions += 1
        reviewee.rating = (current_total + review.rating) / reviewee.total_transactions
        
    db.commit()
    db.refresh(db_review)
    
    return db_review
