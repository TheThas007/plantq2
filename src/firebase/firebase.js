import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCPwwmhfbSOtqVIT2fsdhXFa0RR1l15M8w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "plantiq-5127f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "plantiq-5127f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "plantiq-5127f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "491499941592",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:491499941592:web:1bd0510df3c6a484ea71ad"
};

let app;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error. Did you fill out the .env file?", error);
}

export { auth, db, storage };
export default app;
