// src/pages/Alerts.jsx
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Eye,
  Search,
  Filter,
  X,
} from "lucide-react";

export default function Alerts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // Example alert data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      camera: "Entrance Cam",
      type: "Weapon Detected",
      confidence: 96,
      time: "2025-10-09 18:32",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800&q=80",
    },
    {
      id: 2,
      camera: "Parking Lot",
      type: "Crowd Detected",
      confidence: 87,
      time: "2025-10-09 17:45",
      status: "Resolved",
      image:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80",
    },
    {
      id: 3,
      camera: "Lobby Cam",
      type: "Violence Detected",
      confidence: 92,
      time: "2025-10-09 16:18",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1598887142485-2b8be0a43c02?w=800&q=80",
    },
    {
      id: 4,
      camera: "Corridor Cam",
      type: "Weapon Detected",
      confidence: 89,
      time: "2025-10-09 15:42",
      status: "Resolved",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Filter logic
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.camera.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || alert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter((a) => a.status === "Active").length;
  const resolvedAlerts = alerts.filter((a) => a.status === "Resolved").length;

  const sidebarWidth = sidebarExpanded ? 160 : 60;
  const navbarHeight = 64;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        setActivePage={() => {}}
        activePage="alerts"
        isExpanded={sidebarExpanded}
        setIsExpanded={setSidebarExpanded}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar userEmail={user?.email} />

        {/* Alerts Content */}
        <div
          className="flex-1 overflow-auto p-6 transition-all duration-300"
          style={{ marginLeft: sidebarWidth, paddingTop: navbarHeight }}
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              title="Total Alerts"
              value={totalAlerts}
              color="green"
              icon={<Bell className="text-green-600" size={24} />}
            />
            <SummaryCard
              title="Active Alerts"
              value={activeAlerts}
              color="red"
              icon={<AlertTriangle className="text-red-600" size={24} />}
            />
            <SummaryCard
              title="Resolved Alerts"
              value={resolvedAlerts}
              color="blue"
              icon={<CheckCircle className="text-blue-600" size={24} />}
            />
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-1/2">
              <Search className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by camera or alert type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Camera</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Confidence
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Time</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{alert.camera}</td>
                      <td className="px-4 py-3">{alert.type}</td>
                      <td className="px-4 py-3">{alert.confidence}%</td>
                      <td className="px-4 py-3">{alert.time}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.status === "Active"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="text-green-600 hover:text-green-800 transition"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-gray-400 py-6 italic"
                    >
                      No alerts match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedAlert(null)}
            >
              <X size={20} />
            </button>

            <img
              src={selectedAlert.image}
              alt="Alert Snapshot"
              className="w-full h-56 object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {selectedAlert.type}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Detected on <strong>{selectedAlert.camera}</strong> at{" "}
                {selectedAlert.time}
              </p>

              <div className="space-y-2">
                <p>
                  <strong>Confidence:</strong>{" "}
                  <span className="text-green-600">
                    {selectedAlert.confidence}%
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      selectedAlert.status === "Active"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {selectedAlert.status}
                  </span>
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for summary cards
const SummaryCard = ({ title, value, color, icon }) => (
  <div
    className={`bg-white rounded-xl shadow-md p-4 flex items-center gap-3 border-l-4 border-${color}-500`}
  >
    {icon}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);
