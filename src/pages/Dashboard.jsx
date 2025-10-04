import { useState, useEffect } from "react";
import { CameraFeed } from "../components/CameraFeed";
import { AlertCard } from "../components/AlertCard";
import { AddCameraModal } from "../components/AddCameraModal";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("cameras");
    if (saved) setCameras(JSON.parse(saved));
  }, []);

  // Save to localStorage when cameras change
  useEffect(() => {
    localStorage.setItem("cameras", JSON.stringify(cameras));
  }, [cameras]);

  const handleAddCamera = (fileUrl) => {
  const newCam = {
    id: Date.now(),
    src: fileUrl,
    name: `Camera ${cameras.length + 1}`,
    status: Math.random() > 0.2 ? "online" : "offline", // 80% chance online
  };
  setCameras([...cameras, newCam]);
  };

  const handleDeleteCamera = (id) => {
  const updated = cameras.filter((cam) => cam.id !== id);
  setCameras(updated);
};




  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-teal-600 px-4 py-2 rounded-lg font-semibold"
        >
          + Add Camera
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cameras.length === 0 ? (
          <div className="col-span-full flex justify-center text-gray-400 italic">
            No cameras added yet
          </div>
        ) : (
          cameras.map((cam) => (
            <CameraFeed
                key={cam.id}
                src={cam.src}
                name={cam.name}
                status={cam.status}
                onDelete={() => handleDeleteCamera(cam.id)}
            />
          ))

        )}

        <AlertCard title="Weapon Detected" time="12:35 PM" level="High" />
        <AlertCard title="Crowd Density High" time="12:50 PM" level="Medium" />
      </div>

      {showModal && (
        <AddCameraModal
          onAdd={handleAddCamera}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
