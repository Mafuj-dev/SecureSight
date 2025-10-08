// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// PrivateRoute component for protecting routes
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Loading state
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Checking authentication...
      </div>
    );
  }

  return (
    <AuthProvider>
      {user ? (
        // Logged in → main dashboard layout
        <div className="flex min-h-screen bg-gray-900 text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar onLogout={() => signOut(auth)} userEmail={user?.email || ""} />
            <main className="flex-1 p-6 overflow-y-auto bg-gray-800 rounded-tl-2xl shadow-inner transition-all">
              <Routes>
                {/* Dashboard is now the main page */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                {/* Redirect all unknown routes to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        // Not logged in → show login/signup/reset routes
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </AuthProvider>
  );
}
