import asyncio
import httpx

async def test_flow():
    base_url = "http://localhost:8000/api/v1"
    
    # 1. Test Dashboard / Harga
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{base_url}/harga/")
        print("Harga API Status:", res.status_code)
        
        # 2. Test Create Listing (Farmer)
        headers_farmer = {"X-User-Id": "5a351aad-6070-4264-a6e0-bed3232ab399"}
        listing_payload = {
            "commodity_id": "c1",
            "title": "Test Panen Bawang",
            "quantity": 1000,
            "unit": "kg",
            "price": 25000,
            "location": "Brebes",
            "grade": "A",
            "description": "Bawang merah super brebes",
            "status": "active"
        }
        res = await client.post(f"{base_url}/listings/", json=listing_payload, headers=headers_farmer)
        print("Create Listing Status:", res.status_code)
        if res.status_code != 200:
            print("Error:", res.json())
            return
            
        listing_id = res.json()["id"]
        
        # 3. Test Submit Bid (Tengkulak)
        headers_tengkulak = {"X-User-Id": "c25594e8-7901-40ae-b202-da8d1512990d"}
        bid_payload = {"amount": 26000}
        res = await client.post(f"{base_url}/listings/{listing_id}/bids", json=bid_payload, headers=headers_tengkulak)
        print("Submit Bid Status:", res.status_code)
        
        # 4. Test CV
        files = {'file': ('test.jpg', b'dummy content', 'image/jpeg')}
        res = await client.post(f"{base_url}/cv/analyze", files=files, headers=headers_farmer)
        print("CV Status:", res.status_code)

if __name__ == "__main__":
    asyncio.run(test_flow())
