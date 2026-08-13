import asyncio
from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/api/v1/cv", tags=["Computer Vision"])

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Simulate processing delay
    await asyncio.sleep(1.5)
    
    return {
        "grade": "A",
        "confidence": 92.5,
        "description": "Kualitas sangat baik",
        "attributes": [
            {"name": "Kesegaran", "value": "Tinggi", "score": 95},
            {"name": "Ukuran", "value": "Besar", "score": 90},
            {"name": "Tingkat Cacat", "value": "Rendah", "score": 85}
        ]
    }
