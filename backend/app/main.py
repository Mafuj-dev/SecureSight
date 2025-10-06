from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.detection_service import run_yolo_detection
import os, shutil

app = FastAPI(title="SecureSight Backend")

# CORS setup so your React app can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "SecureSight Backend Running"}

@app.post("/upload_video/")
async def upload_video(file: UploadFile = File(...)):
    # save uploaded video
    video_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # run YOLO detection
    results = run_yolo_detection(video_path)

    return {
        "filename": file.filename,
        "detections": results
    }
