from fastapi import APIRouter, UploadFile, File
import time
import random

router = APIRouter()

@router.post("/analyze")
async def analyze_commodity(file: UploadFile = File(...)):
    """
    Mock CV inference endpoint (EfficientNet mock).
    Accepts an image and returns a quality grade and confidence score.
    """
    # In a real scenario, we would save the file temporarily and pass to PyTorch/TensorFlow model
    # content = await file.read()
    
    # Simulate processing delay
    time.sleep(1.5)
    
    # Mock inference result
    grades = [
        {"grade": "Grade A", "desc": "Kualitas Premium, ukuran seragam, tidak ada cacat"},
        {"grade": "Grade B", "desc": "Kualitas Standar, sedikit variasi ukuran, cacat minor <5%"},
        {"grade": "Grade C", "desc": "Kualitas Rendah, tidak seragam, cacat >10%"}
    ]
    
    # Randomly assign a grade for mock purposes
    result = random.choices(grades, weights=[0.4, 0.4, 0.2])[0]
    confidence = round(random.uniform(0.85, 0.98), 2)
    
    return {
        "success": True,
        "filename": file.filename,
        "grade": result["grade"],
        "description": result["desc"],
        "confidence": confidence
    }
