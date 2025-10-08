// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // ✅ add this import

const firebaseConfig = {
  apiKey: "AIzaSyBgzjo6Rg9vsWFF5FTyXxz64jr74zaQ1pY",
  authDomain: "sight-2094c.firebaseapp.com",
  projectId: "sight-2094c",
  storageBucket: "sight-2094c.firebasestorage.app",
  messagingSenderId: "744521349979",
  appId: "1:744521349979:web:3503e8af259944eaaff87e",
  measurementId: "G-ZV5XZ0JKLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Authentication and export it
export const auth = getAuth(app);
