// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app’s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX6sMVJtxaBHrwWYepfQpX9KgYqjjsccU",
  authDomain: "fir-tast-2069a.firebaseapp.com",
  projectId: "fir-tast-2069a",
  storageBucket: "fir-tast-2069a.appspot.com",
  messagingSenderId: "319391138623",
  appId: "1:319391138623:web:d0468771800689f0abc98a",
    measurementId: "G-S9T9WDZEFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
