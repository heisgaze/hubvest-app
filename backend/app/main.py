from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db.database import engine, Base

from .api.v1 import market, listings, bids, cv, transactions

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hubvest API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Hubvest API"}

app.include_router(market.router, prefix="/api/v1/market-prices", tags=["market"])
app.include_router(cv.router, prefix="/api/v1/cv", tags=["cv"])
app.include_router(listings.router, prefix="/api/v1/listings", tags=["listings"])
app.include_router(bids.router, prefix="/api/v1/bids", tags=["bids"])
app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["transactions"])
