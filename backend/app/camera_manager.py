import threading
import cv2
from app.weapon_detection import detect_weapons_json
import time

class CameraManager:
    def __init__(self):
        self.cameras = {}  # camera_id: {"url": ..., "active": True, "detections": [], "thread": ...}

    def add_camera(self, camera_id, url):
        if camera_id in self.cameras:
            return {"error": "Camera already exists"}

        self.cameras[camera_id] = {
            "url": url,
            "active": True,
            "detections": [],
            "thread": threading.Thread(target=self._run_detection, args=(camera_id,), daemon=True)
        }

        self.cameras[camera_id]["thread"].start()
        return {"success": True, "camera_id": camera_id}

    def remove_camera(self, camera_id):
        if camera_id not in self.cameras:
            return {"error": "Camera not found"}
        self.cameras[camera_id]["active"] = False
        del self.cameras[camera_id]
        return {"success": True}

    def _run_detection(self, camera_id):
        url = self.cameras[camera_id]["url"]
        cap = cv2.VideoCapture(url)
        while self.cameras[camera_id]["active"]:
            ret, frame = cap.read()
            if not ret:
                time.sleep(0.1)
                continue

            detections = detect_weapons_json(frame)
            self.cameras[camera_id]["detections"] = detections  # store latest detections

        cap.release()

    def get_detections(self, camera_id):
        if camera_id not in self.cameras:
            return {"error": "Camera not found"}
        return {"camera_id": camera_id, "detections": self.cameras[camera_id]["detections"]}
