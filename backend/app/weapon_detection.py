from ultralytics import YOLO

model = YOLO("app/models/last.pt")

def detect_weapons_json(frame):
    """
    Input: single cv2 frame
    Output: list of detections for that frame
    """
    results = model(frame)
    frame_dets = []

    for r in results[0].boxes.data.tolist():  # Convert to list
        # r = [x1, y1, x2, y2, confidence, class]
        frame_dets.append({
            "bbox": r[:4],           # [x1, y1, x2, y2]
            "confidence": r[4],
            "class_id": int(r[5])
        })
    return frame_dets
