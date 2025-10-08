import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CameraFeed } from "../components/CameraFeed";
import { AlertCard } from "../components/AlertCard";
import { AddCameraModal } from "../components/AddCameraModal";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth(); // removed logout since it’s not used here
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // Load cameras from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cameras");
      if (saved) setCameras(JSON.parse(saved));
    } catch (error) {
      console.error("Failed to load cameras:", error);
    }
  }, []);

  // Save cameras to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("cameras", JSON.stringify(cameras));
  }, [cameras]);

  const handleAddCamera = (fileUrl) => {
    const newCam = {
      id: Date.now(),
      src: fileUrl,
      name: `Camera ${cameras.length + 1}`,
      status: Math.random() > 0.2 ? "online" : "offline", // 80% online
    };
    setCameras((prev) => [...prev, newCam]);
  };

  const handleDeleteCamera = (id) => {
    if (window.confirm("Are you sure you want to delete this camera?")) {
      setCameras((prev) => prev.filter((cam) => cam.id !== id));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Add Camera
        </button>
      </div>

      {/* Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
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
      </div>

      {/* Alerts Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Recent Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AlertCard title="Weapon Detected" time="12:35 PM" level="High" />
          <AlertCard title="Crowd Density High" time="12:50 PM" level="Medium" />
          <AlertCard title="Unauthorized Access" time="01:10 PM" level="Low" />
        </div>
      </div>

      {/* Modal for adding camera */}
      {showModal && (
        <AddCameraModal
          onAdd={handleAddCamera}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
