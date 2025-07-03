import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZdz3iT1pWactB0PrDWsNsVIuIUBnYyHE",
  authDomain: "myapplication-d691d792.firebaseapp.com",
  projectId: "myapplication-d691d792",
  storageBucket: "myapplication-d691d792.firebasestorage.app",
  messagingSenderId: "96759096158",
  appId: "1:96759096158:web:dc00f44a22b83850dce5cf"
};

const app = initializeApp(firebaseConfig);

export { app };