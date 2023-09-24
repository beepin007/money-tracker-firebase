// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoHFGzPcT8Sm4TrXlrAEcI-a7Al8O_TEk",
  authDomain: "money-tracker-ff403.firebaseapp.com",
  projectId: "money-tracker-ff403",
  storageBucket: "money-tracker-ff403.appspot.com",
  messagingSenderId: "191390168124",
  appId: "1:191390168124:web:87dc99a133e450f2d5ff39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
