import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.db.database import SessionLocal, Base, engine
from app.db.models import User, Commodity, MarketPrice
from datetime import datetime, timedelta

def seed_db():
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(Commodity).count() > 0:
        print("Data already exists!")
        return

    print("Seeding commodities and market prices...")

    # Users
    petani = User(id="1", name="Budi Petani", role="petani", location="Sumedang", phone="08123456789")
    tengkulak = User(id="2", name="Tengkulak Jaya", role="tengkulak", location="Bandung", phone="08987654321")
    db.add(petani)
    db.add(tengkulak)
    
    # Commodities
    jagung = Commodity(id="1", name="Jagung", icon="🌽")
    padi = Commodity(id="2", name="Padi", icon="🌾")
    tomat = Commodity(id="3", name="Tomat", icon="🍅")
    db.add_all([jagung, padi, tomat])
    
    db.commit()

    # Market Prices
    prices = [
        MarketPrice(commodity_id=jagung.id, price=5500, location="Pasar Induk", date=datetime.now(), trend="up"),
        MarketPrice(commodity_id=padi.id, price=6000, location="Pasar Induk", date=datetime.now(), trend="stable"),
        MarketPrice(commodity_id=tomat.id, price=8000, location="Pasar Induk", date=datetime.now(), trend="down"),
    ]
    db.add_all(prices)
    db.commit()
    
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_db()
