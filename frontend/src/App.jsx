import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import VideoDetection from "./pages/VideoDetection";
import { useState } from "react";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "video-detection":
        return <VideoDetection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar setActivePage={setActivePage} activePage={activePage} /> {/* ✅ pass props */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-800 rounded-tl-2xl shadow-inner transition-all">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
