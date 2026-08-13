from fastapi import Header, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from app.db.database import AsyncSessionLocal
from app.db.models import User

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

async def get_current_user(
    x_user_id: str = Header(..., description="Dummy Auth Header for MVP"),
    db: AsyncSession = Depends(get_db)
) -> User:
    try:
        user_uuid = UUID(x_user_id)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid User ID format")
        
    result = await db.execute(select(User).where(User.id == user_uuid))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user
