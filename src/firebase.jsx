import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC2OEp7XkaKxJ90h-y-xt9OS78ECpw2dlc",
  authDomain: "password-manager-ab3f6.firebaseapp.com",
  projectId: "password-manager-ab3f6",
  storageBucket: "password-manager-ab3f6.appspot.com",
  messagingSenderId: "522131556225",
  appId: "1:522131556225:web:771c41f864063891390a80"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();