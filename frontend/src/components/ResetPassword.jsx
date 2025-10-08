import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
      <button onClick={handleReset} className="bg-purple-500 text-white px-4 py-2 rounded">Send Reset Email</button>
      {message && <p className="text-blue-500">{message}</p>}
    </div>
  );
}
