// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import LiveView from "./pages/LiveView";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// PrivateRoute component for protecting authenticated pages
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// PublicRoute component to prevent logged-in users from visiting login/signup pages
function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Loading screen
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
          <Sidebar activePage={window.location.pathname} /> {/* Highlight active page */}
          <div className="flex-1 flex flex-col">
            <Navbar
              onLogout={async () => {
                try {
                  await signOut(auth);
                } catch (err) {
                  console.error("Logout failed:", err);
                }
              }}
              userEmail={user?.email || ""}
            />
            <main className="flex-1 p-6 overflow-y-auto bg-gray-800 rounded-tl-2xl shadow-inner transition-all">
              <Routes>
                <Route path="/" element={<PrivateRoute><LiveView /></PrivateRoute>} />
                <Route path="/live-view" element={<PrivateRoute><LiveView /></PrivateRoute>} />
                <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                <Route path="/alerts" element={<PrivateRoute><Alerts /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        // Not logged in → show login/signup/forgot-password pages
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </AuthProvider>
  );
}
