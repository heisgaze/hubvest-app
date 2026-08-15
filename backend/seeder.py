from app.db.database import SessionLocal, engine, Base
from app.db.models import User, Commodity, MarketPrice
from datetime import datetime

# Recreate tables
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# 1. Create Users
petani_1 = User(
    id="u1",
    name="Pak Budi",
    role="petani",
    location="Lembang, Bandung",
    rating=4.8,
    total_transactions=12,
    verified=True
)

tengkulak_1 = User(
    id="t1",
    name="Juragan Karyo",
    role="tengkulak",
    location="Pasar Induk Kramat Jati",
    rating=4.5,
    total_transactions=34,
    verified=True
)

db.add_all([petani_1, tengkulak_1])

# 2. Create Commodities
c_bawang = Commodity(id="c1", name="Bawang Merah", icon="🧅")
c_cabai = Commodity(id="c2", name="Cabai Rawit Merah", icon="🌶️")
c_beras = Commodity(id="c3", name="Beras Medium", icon="🌾")
c_tomat = Commodity(id="c4", name="Tomat", icon="🍅")
c_kentang = Commodity(id="c5", name="Kentang Dieng", icon="🥔")

db.add_all([c_bawang, c_cabai, c_beras, c_tomat, c_kentang])

# 3. Create Market Prices
market_prices = [
    # Bawang Merah
    MarketPrice(commodity_id="c1", location="Brebes", price=25000.0, trend="stable", date=datetime.utcnow()),
    MarketPrice(commodity_id="c1", location="Bandung", price=28000.0, trend="up", date=datetime.utcnow()),
    MarketPrice(commodity_id="c1", location="Nganjuk", price=24500.0, trend="stable", date=datetime.utcnow()),
    MarketPrice(commodity_id="c1", location="Enrekang", price=23000.0, trend="down", date=datetime.utcnow()),
    
    # Cabai Rawit Merah
    MarketPrice(commodity_id="c2", location="Garut", price=45000.0, trend="up", date=datetime.utcnow()),
    MarketPrice(commodity_id="c2", location="Kediri", price=42000.0, trend="up", date=datetime.utcnow()),
    MarketPrice(commodity_id="c2", location="Bandung", price=48000.0, trend="up", date=datetime.utcnow()),
    
    # Beras Medium
    MarketPrice(commodity_id="c3", location="Cianjur", price=14500.0, trend="down", date=datetime.utcnow()),
    MarketPrice(commodity_id="c3", location="Ngawi", price=13800.0, trend="stable", date=datetime.utcnow()),
    MarketPrice(commodity_id="c3", location="Indramayu", price=14000.0, trend="stable", date=datetime.utcnow()),
    
    # Tomat
    MarketPrice(commodity_id="c4", location="Malang", price=8500.0, trend="down", date=datetime.utcnow()),
    MarketPrice(commodity_id="c4", location="Bandung", price=9000.0, trend="down", date=datetime.utcnow()),
    
    # Kentang
    MarketPrice(commodity_id="c5", location="Wonosobo", price=15000.0, trend="stable", date=datetime.utcnow()),
    MarketPrice(commodity_id="c5", location="Pangalengan", price=15500.0, trend="up", date=datetime.utcnow()),
]

db.add_all(market_prices)

db.commit()
db.close()

print("Database successfully seeded with initial mock data!")
