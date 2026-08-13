import asyncio
import uuid
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy import text

from app.db.models import Base, User, Commodity, MarketPrice, Listing, Bid, Transaction

DATABASE_URL = "sqlite+aiosqlite:///./hubvest.db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def seed_data():
    async with AsyncSessionLocal() as session:
        # Clear existing data
        await session.execute(text("DELETE FROM transactions"))
        await session.execute(text("DELETE FROM bids"))
        await session.execute(text("DELETE FROM listings"))
        await session.execute(text("DELETE FROM market_prices"))
        await session.execute(text("DELETE FROM commodities"))
        await session.execute(text("DELETE FROM users"))
        await session.commit()

        print("Cleared old data.")

        # Users
        farmer_id = uuid.uuid4()
        tengkulak_id = uuid.uuid4()
        users = [
            User(id=farmer_id, name="Budi Santoso", role="farmer", location="Brebes, Jawa Tengah", rating=4.8, total_transactions=24, joined_date=datetime.now()),
            User(id=tengkulak_id, name="Ahmad Jaya", role="tengkulak", location="Semarang, Jawa Tengah", rating=4.5, total_transactions=56, joined_date=datetime.now()),
        ]
        session.add_all(users)

        # Commodities
        c_merah = "c1"
        c_cabai = "c2"
        c_kentang = "c3"
        commodities = [
            Commodity(id=c_merah, name="Bawang Merah", icon="🧅"),
            Commodity(id=c_cabai, name="Cabai Rawit", icon="🌶️"),
            Commodity(id=c_kentang, name="Kentang", icon="🥔"),
        ]
        session.add_all(commodities)

        # Market Prices
        prices = [
            MarketPrice(id=uuid.uuid4(), commodity_id=c_merah, price=30000, trend="up", location="Brebes"),
            MarketPrice(id=uuid.uuid4(), commodity_id=c_cabai, price=50000, trend="up", location="Brebes"),
            MarketPrice(id=uuid.uuid4(), commodity_id=c_kentang, price=15000, trend="down", location="Brebes"),
        ]
        session.add_all(prices)

        # Listings
        listing_id = uuid.uuid4()
        listings = [
            Listing(id=listing_id, seller_id=farmer_id, commodity_id=c_merah, title="Panen Bawang Merah Super", quantity=500, unit="kg", price=29000, location="Brebes", grade="A", description="Panen raya kualitas unggul", status="active")
        ]
        session.add_all(listings)

        await session.commit()
        print("Mock data seeded successfully!")
        print(f"Test Farmer ID (X-User-Id): {farmer_id}")
        print(f"Test Tengkulak ID (X-User-Id): {tengkulak_id}")

if __name__ == "__main__":
    asyncio.run(seed_data())
