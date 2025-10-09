import React, { useState } from "react";
import { Monitor, BarChart3, Bell, Shield, Settings } from "lucide-react";

export const Sidebar = ({ setActivePage, activePage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: "live-view", label: "Live View", icon: <Monitor size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "alerts", label: "Alerts", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-950 flex flex-col p-4 space-y-3 shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Brand Title */}
      <h1
        className={`text-green-500 font-bold mb-6 tracking-wide transition-all duration-300 ${
          isExpanded ? "text-2xl opacity-100" : "text-xl opacity-0"
        }`}
      >
        {isExpanded && "SecureSight"}
      </h1>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activePage === item.id
              ? "bg-green-600 text-white shadow-[0_0_15px_3px_rgba(34,197,94,0.5)]"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          <div className="flex items-center justify-center">{item.icon}</div>
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};
