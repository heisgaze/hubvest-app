# Hubvest MVP

Hubvest is an agricultural supply chain collaboration platform connecting local farmers with middlemen ("tengkulak"). 

This project consists of two parts:
1. **Frontend**: Next.js 14 App Router
2. **Backend**: FastAPI (Python) + SQLite Database

**NOTE:** This MVP does NOT require Docker! It runs natively using an embedded SQLite database.

---

## 🚀 How to Run Locally

You will need to open **two separate terminals**: one for the backend and one for the frontend.

### 1. Run the Backend (Terminal 1)
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
```

Activate the virtual environment:
```bash
source venv/bin/activate
```

*(Optional)* If you haven't seeded the mock data yet, you can run the seeder:
```bash
python seeder.py
```

Start the FastAPI server:
```bash
uvicorn app.main:app --reload --port 8000
```
> The backend is now running at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

---

### 2. Run the Frontend (Terminal 2)
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install the dependencies (if you haven't already):
```bash
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
> The frontend is now running! Open your browser and go to `http://localhost:3000`.

---

## 🛠 Features Implemented
- **Role Switching**: Instantly switch between "Farmer" and "Tengkulak" views using the toggle button in the header.
- **Price Fairness Index (PFI)**: View live market prices and trend directions.
- **Smart Bidding**: Tengkulaks can place bids on active farmer listings.
- **Computer Vision Grading (Mock)**: Simulate AI quality grading for harvest crops.
