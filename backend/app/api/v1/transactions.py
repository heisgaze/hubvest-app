from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID
from pydantic import BaseModel

from app.api.dependencies import get_db, get_current_user
from app.db.models import Transaction, User
from app.schemas.schemas import TransactionResponse

router = APIRouter(prefix="/api/v1/transactions", tags=["Transactions"])

class StatusUpdate(BaseModel):
    status: str

@router.get("/", response_model=List[TransactionResponse])
async def get_transactions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role == "farmer":
        # Farmer's transactions (where they are the seller in the listing)
        # For simplicity in MVP, we just return all transactions
        # A more robust query would join with Listing to filter by seller_id
        result = await db.execute(select(Transaction))
    else:
        # Tengkulak's transactions
        result = await db.execute(select(Transaction).where(Transaction.buyer_id == current_user.id))
        
    return result.scalars().all()

@router.get("/{id}", response_model=TransactionResponse)
async def get_transaction(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Transaction).where(Transaction.id == id))
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.put("/{id}/status", response_model=TransactionResponse)
async def update_transaction_status(
    id: UUID,
    status_update: StatusUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Transaction).where(Transaction.id == id))
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    transaction.status = status_update.status
    await db.commit()
    await db.refresh(transaction)
    return transaction
