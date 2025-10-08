// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Error creating account. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="p-8 bg-gray-800 rounded-2xl shadow-lg w-96 flex flex-col"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
        SecureSight Sign Up
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-2 bg-gray-700 border border-gray-600 rounded text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 bg-gray-700 border border-gray-600 rounded text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
      >
        Sign Up
      </button>
    </form>
  );
}
