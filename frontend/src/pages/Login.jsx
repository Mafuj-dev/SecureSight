// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-8 bg-gray-800 rounded-2xl shadow-lg w-96 flex flex-col"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
        SecureSight Login
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
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
      >
        Login
      </button>
    </form>
  );
}
