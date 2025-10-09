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
      className={`
        bg-gray-800 text-white shadow-lg z-40
        flex flex-col md:fixed md:left-0 md:top-[var(--navbar-height,4rem)] md:h-[calc(100vh-var(--navbar-height,4rem))]
        md:flex-col md:w-15 md:hover:w-40 md:transition-all md:duration-300
        fixed bottom-0 left-0 w-full flex-row justify-around md:justify-start
      `}
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
              relative flex items-center justify-center md:justify-start gap-2 px-3 py-2 m-1 rounded-md text-sm font-medium transition-all duration-300
              ${isActive ? "bg-green-600 text-white shadow-[0_0_15px_3px_rgba(34,197,94,0.5)] md:font-bold" : "hover:bg-gray-700 text-gray-300"}
            `}
          >
            <div
              className={`flex items-center justify-center ${isActive ? "text-white" : "text-gray-300"}`}
            >
              {item.icon}
            </div>
            <span
              className={`hidden md:inline-block whitespace-nowrap transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </span>

            {/* Animated underline for mobile */}
            {isActive && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-green-400 rounded-full md:hidden transition-all duration-300"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
