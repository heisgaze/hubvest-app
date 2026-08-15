import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.db.database import SessionLocal, Base, engine
from app.db.models import User, Commodity, MarketPrice, Listing, Bid, Transaction, Review
from datetime import datetime, timedelta

def seed_db():
    db = SessionLocal()
    
    print("Clearing old data...")
    db.query(Review).delete()
    db.query(Transaction).delete()
    db.query(Bid).delete()
    db.query(Listing).delete()
    db.query(MarketPrice).delete()
    db.query(Commodity).delete()
    db.query(User).delete()
    db.commit()

    print("Seeding new data...")

    # Users
    petani = User(id="u1", name="Budi Petani", role="petani", location="Sumedang", phone="08123456789")
    tengkulak = User(id="t1", name="Tengkulak Jaya", role="tengkulak", location="Bandung", phone="08987654321")
    db.add(petani)
    db.add(tengkulak)
    
    # Commodities
    c1 = Commodity(id="c1", name="Bawang Merah", icon="🧅")
    c2 = Commodity(id="c2", name="Cabai Rawit Merah", icon="🌶️")
    c3 = Commodity(id="c3", name="Beras Medium", icon="🍚")
    c4 = Commodity(id="c4", name="Tomat", icon="🍅")
    c5 = Commodity(id="c5", name="Kentang Dieng", icon="🥔")
    db.add_all([c1, c2, c3, c4, c5])
    
    db.commit()

    # Market Prices
    prices = [
        MarketPrice(commodity_id=c1.id, price=25000, location="Pasar Induk", date=datetime.now(), trend="up"),
        MarketPrice(commodity_id=c2.id, price=45000, location="Pasar Induk", date=datetime.now(), trend="up"),
        MarketPrice(commodity_id=c3.id, price=14000, location="Pasar Induk", date=datetime.now(), trend="stable"),
        MarketPrice(commodity_id=c4.id, price=8500, location="Pasar Induk", date=datetime.now(), trend="down"),
        MarketPrice(commodity_id=c5.id, price=15000, location="Pasar Induk", date=datetime.now(), trend="stable"),
    ]
    db.add_all(prices)
    db.commit()
    
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_db()
