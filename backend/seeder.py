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
c_bawang = Commodity(id="c1", name="Bawang Merah", icon="bawang")
c_cabai = Commodity(id="c2", name="Cabai Rawit", icon="cabai")
c_beras = Commodity(id="c3", name="Beras Pandan Wangi", icon="beras")

db.add_all([c_bawang, c_cabai, c_beras])

# 3. Create Market Prices
mp_bawang = MarketPrice(
    commodity_id="c1",
    location="Jawa Barat",
    price=25000.0,
    trend="up",
    date=datetime.utcnow()
)

mp_cabai = MarketPrice(
    commodity_id="c2",
    location="Jawa Barat",
    price=45000.0,
    trend="down",
    date=datetime.utcnow()
)

db.add_all([mp_bawang, mp_cabai])

db.commit()
db.close()

print("Database successfully seeded with initial mock data!")
