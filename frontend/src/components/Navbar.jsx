import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Navbar = ({ userEmail }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The auth listener in App.jsx will automatically redirect to Login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-3">
        {userEmail && (
          <span className="text-sm text-gray-300 hidden sm:block">
            {userEmail}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-primary hover:bg-teal-600 px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
