import React from "react";
import { Monitor, BarChart3, Bell, Shield, Settings } from "lucide-react";

export const Sidebar = ({ setActivePage, activePage, isExpanded, setIsExpanded }) => {
  const menuItems = [
    { id: "live-view", label: "Live View", icon: <Monitor size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "alerts", label: "Alerts", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={`
        bg-gray-800 text-white shadow-lg z-40
        flex flex-col fixed top-16 left-0 bottom-0
        transition-all duration-300
        overflow-hidden
      `}
      style={{ width: isExpanded ? 160 : 50 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {menuItems.map((item) => {
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`
              relative flex items-center gap-2 px-3 py-2 m-1 rounded-md text-sm font-medium transition-all duration-300
              ${isActive ? "bg-green-600 text-white font-bold" : "hover:bg-gray-700 text-gray-300"}
            `}
          >
            {/* Icon */}
            <div
              className={`flex items-center justify-center ${isActive ? "text-white" : "text-gray-300"}`}
            >
              {item.icon}
            </div>

            {/* Label */}
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? "max-w-full opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}`}
            >
              {item.label}
            </span>

            {/* Mobile underline */}
            {isActive && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-green-400 rounded-full md:hidden transition-all duration-300"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
