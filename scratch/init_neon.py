import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.db.database import Base, engine
from app.db.models import User, Commodity, MarketPrice

print("Creating tables in Neon...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
