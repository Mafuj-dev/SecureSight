from ultralytics import YOLO
import cv2

# Load your YOLO model once
model = YOLO("app/models_data/last.pt")

def run_yolo_detection(video_path: str):
    """
    Runs YOLO inference on the given video and returns detection results.
    """
    cap = cv2.VideoCapture(video_path)
    results_list = []
    frame_number = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_number += 1

        # run detection
        results = model(frame)

        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                x1, y1, x2, y2 = box.xyxy[0].tolist()

                results_list.append({
                    "frame": frame_number,
                    "class_id": cls_id,
                    "confidence": round(conf, 3),
                    "bbox": [round(x1, 1), round(y1, 1), round(x2, 1), round(y2, 1)]
                })

    cap.release()
    return results_list
