import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CameraFeed } from "../components/CameraFeed";
import { AddCameraModal } from "../components/AddCameraModal";
import { AlertCard } from "../components/AlertCard";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

export default function LiveView() {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleAddCamera = (fileUrl) => {
    const newCam = {
      id: Date.now(),
      src: fileUrl,
      name: `Camera ${cameras.length + 1}`,
      status: Math.random() > 0.2 ? "online" : "offline",
    };
    setCameras((prev) => [...prev, newCam]);
  };

  const handleDeleteCamera = (id) => {
    if (window.confirm("Are you sure you want to delete this camera?")) {
      setCameras((prev) => prev.filter((cam) => cam.id !== id));
    }
  };

  // Example alert counts
  const totalAlerts = 12;
  const activeCameras = cameras.filter((c) => c.status === "online").length;
  const currentAlerts = 3;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar userEmail={user?.email} />

        {/* Cameras + Alert Panel */}
        <div className="flex flex-1 gap-6 p-6 overflow-auto">
          {/* Cameras Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-80">
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

          {/* Right Panel */}
          <div className="w-72 flex-shrink-0">
            <AlertCard
              totalAlerts={totalAlerts}
              activeCameras={activeCameras}
              currentAlerts={currentAlerts}
              onAddCameraClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddCameraModal
          onAdd={handleAddCamera}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
