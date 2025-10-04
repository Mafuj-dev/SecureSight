import { useState } from "react";
import { CameraFeed } from "../components/CameraFeed";
import { AlertCard } from "../components/AlertCard";
import { AddCameraModal } from "../components/AddCameraModal";

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddCamera = (fileUrl) => {
    setCameras([...cameras, fileUrl]);
  };

  return (
    <div>
      {/* Add Camera Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-teal-600 px-4 py-2 rounded-lg font-semibold"
        >
          + Add Camera
        </button>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cameras.length === 0 ? (
          <div className="col-span-full flex justify-center text-gray-400 italic">
            No cameras added yet
          </div>
        ) : (
          cameras.map((src, idx) => <CameraFeed key={idx} src={src} />)
        )}

        <AlertCard title="Weapon Detected" time="12:35 PM" level="High" />
        <AlertCard title="Crowd Density High" time="12:50 PM" level="Medium" />
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
