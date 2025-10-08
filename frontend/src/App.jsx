// src/App.jsx
import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import VideoDetection from "./pages/VideoDetection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const [showSignup, setShowSignup] = useState(false);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Page rendering logic
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

  // Show loading while checking login
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Checking authentication...
      </div>
    );
  }

  // If not logged in, show login/signup pages
  if (!user) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        {showSignup ? <Signup /> : <Login />}
        <button
          onClick={() => setShowSignup(!showSignup)}
          className="mt-4 text-blue-400 underline"
        >
          {showSignup ? "Back to Login" : "Create an account"}
        </button>
      </div>
    );
  }

  // If logged in, show main SecureSight dashboard
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 flex flex-col">
        <Navbar
          onLogout={() => signOut(auth)}
          userEmail={user?.email || ""}
        />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-800 rounded-tl-2xl shadow-inner transition-all">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
