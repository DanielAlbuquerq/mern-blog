// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3e5f4.firebaseapp.com",
  projectId: "mern-blog-3e5f4",
  storageBucket: "mern-blog-3e5f4.appspot.com",
  messagingSenderId: "1023419898879",
  appId: "1:1023419898879:web:5b900b42e992a3a97065ca",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
