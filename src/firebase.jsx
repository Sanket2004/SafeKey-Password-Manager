import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCR4eqBHDqPvVkKITfhnF422OObQmvJ_UE",
  authDomain: "password-manager-2cd2d.firebaseapp.com",
  projectId: "password-manager-2cd2d",
  storageBucket: "password-manager-2cd2d.appspot.com",
  messagingSenderId: "965887187673",
  appId: "1:965887187673:web:2cfad3296bf9de2a2dfcc8"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();