from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.weapon_detection import detect_weapons_json
from app.camera_manager import CameraManager
import os, shutil, cv2
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="SecureSight Backend")
app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload folder
UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize camera manager
manager = CameraManager()

@app.get("/")
def home():
    return {"message": "SecureSight Backend Running"}

# -----------------------
# Camera management
# -----------------------
@app.post("/camera/add/{camera_id}")
def add_camera(camera_id: str, url: str):
    return manager.add_camera(camera_id, url)

@app.post("/camera/remove/{camera_id}")
def remove_camera(camera_id: str):
    return manager.remove_camera(camera_id)

@app.get("/camera/detections/{camera_id}")
def get_camera_detections(camera_id: str):
    return manager.get_detections(camera_id)

# -----------------------
# Upload video & run detection
# -----------------------
@app.post("/upload_video/")
async def upload_video(file: UploadFile = File(...)):
    try:
        video_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        detections = run_yolo_detection(video_path)

        public_url = f"http://127.0.0.1:8000/uploads/{file.filename}"
        return JSONResponse({
            "filename": file.filename,
            "url": public_url,
            "detections": detections
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
