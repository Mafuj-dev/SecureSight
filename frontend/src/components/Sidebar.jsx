import React from "react";
import { Video, LayoutDashboard } from "lucide-react"; // optional icons

export const Sidebar = ({ setActivePage, activePage }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "video-detection", label: "Video Detection", icon: <Video size={18} /> }, // ✅ new item
  ];

  return (
    <div className="w-64 bg-gray-950 flex flex-col p-4 space-y-3 shadow-lg">
      <h1 className="text-2xl font-bold text-green-500 mb-6 tracking-wide">
        SecureSight
      </h1>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activePage === item.id
              ? "bg-green-600 text-white shadow-md"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};
