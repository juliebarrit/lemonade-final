// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ← hvis du bruger Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDStxN_XPtZqe96aM1SzXA7WjpK5KDXN04",
  authDomain: "lemonade-fc794.firebaseapp.com",
  projectId: "lemonade-fc794",
  storageBucket: "lemonade-fc794.appspot.com",
  messagingSenderId: "661908816085",
  appId: "1:661908816085:web:21d99f5ffb3b7468e7625c",
  measurementId: "G-79N7VD2H4S"
};

const app = initializeApp(firebaseConfig);

// Optional: Only run analytics if supported (prevents Next.js SSR issues)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

// Firestore init (you can also export auth, storage, etc.)
const db = getFirestore(app);

export { app, analytics, db };
