import React, { useState } from "react";

export const AlertCard = ({
  totalAlerts,
  activeCameras,
  currentAlerts,
  onAddCameraClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex flex-col gap-4 bg-gray-800 p-4 shadow-lg fixed top-16 right-0 bottom-0 
                  z-50 transition-all duration-300 overflow-hidden ${isOpen ? "w-40" : "w-10"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded self-end"
      >
        {isOpen ? "«" : "»"}
      </button>

      {/* Add Camera Button (show only when expanded) */}
      {isOpen && (
        <button
          onClick={onAddCameraClick}
          className="mb-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg border-2 border-gray-600"
        >
          + Add Camera
        </button>
      )}

      {/* Total Alerts */}
      {isOpen && (
        <div className="bg-gray-900 w-full h-24 flex flex-col justify-center items-center rounded-xl shadow-lg border-2 border-gray-600">
            <span className="text-red-400 text-3xl font-bold">{totalAlerts}</span>
            <span className="px-3 mt-1 text-white text-sm font-semibold">
              Total Alerts Today
            </span>
        </div>
      )}

      {/* Active Cameras */}
      {isOpen && (
        <div className="bg-gray-900 w-full h-24 flex flex-col justify-center items-center rounded-xl shadow-lg border-2 border-gray-600">
          <span className="text-green-400 text-3xl font-bold">{activeCameras}</span>
            <span className="px-3 mt-1 text-white text-sm font-semibold">
              Active Cameras
            </span>
        </div>
      )}

      {/* Current Alerts */}
      {isOpen && (
        <div className="bg-gray-900 w-full h-24 flex flex-col justify-center items-center rounded-xl shadow-lg border-2 border-gray-600">
          <span className="text-yellow-400 text-3xl font-bold">{currentAlerts}</span>
            <span className="px-3 mt-1 text-white text-sm font-semibold">
              Current Alerts
            </span>
        </div>
      )}
    </div>
  );
};
