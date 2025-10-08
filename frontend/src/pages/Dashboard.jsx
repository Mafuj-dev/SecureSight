import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CameraFeed } from "../components/CameraFeed";
import { AlertCard } from "../components/AlertCard";
import { AddCameraModal } from "../components/AddCameraModal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("cameras");
    if (saved) setCameras(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cameras", JSON.stringify(cameras));
  }, [cameras]);

  const handleAddCamera = async (src, mode) => {
  const cameraId = `cam_${Date.now()}`;

  if (mode === "file") {
    try {
      const fileBlob = await fetch(src).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", fileBlob, `video_${Date.now()}.mp4`);

      const res = await axios.post(`${BACKEND_URL}/upload_video/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;

      const newCam = {
        id: cameraId,
        src: data.url, // backend URL (public video)
        name: `Video ${cameras.length + 1}`,
        type: "video",
        detections: data.detections || [],
      };

      setCameras((prev) => [...prev, newCam]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload video");
    }
  } else if (mode === "url") {
    try {
      await axios.post(`${BACKEND_URL}/camera/add/${cameraId}`, null, {
        params: { url: src },
      });

      const newCam = {
        id: cameraId,
        src: `${BACKEND_URL}/camera/stream/${cameraId}`,
        name: `Camera ${cameras.length + 1}`,
        type: "stream",
        detections: [],
      };
      setCameras((prev) => [...prev, newCam]);
    } catch (err) {
      console.error(err);
      alert("Failed to add camera stream");
    }
  }
};


  const handleDeleteCamera = async (cam) => {
    if (!window.confirm("Are you sure you want to delete this camera?")) return;

    try {
      if (cam.type === "stream") {
        await axios.post(`${BACKEND_URL}/camera/remove/${cam.id}`);
      }
      setCameras(prev => prev.filter(c => c.id !== cam.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete camera");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Add Camera / Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {cameras.length === 0 ? (
          <div className="col-span-full flex justify-center text-gray-400 italic">
            No cameras added yet
          </div>
        ) : (
          cameras.map(cam => (
            <CameraFeed
              key={cam.id}
              src={cam.src}
              name={cam.name}
              type={cam.type}
              detections={cam.detections}
              onDelete={() => handleDeleteCamera(cam)}
            />
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Recent Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AlertCard title="Weapon Detected" time="12:35 PM" level="High" />
          <AlertCard title="Crowd Density High" time="12:50 PM" level="Medium" />
          <AlertCard title="Unauthorized Access" time="01:10 PM" level="Low" />
        </div>
      </div>

      {showModal && (
        <AddCameraModal
          onAdd={(src, mode) => handleAddCamera(src, mode)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
