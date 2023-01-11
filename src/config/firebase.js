// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Cvw_nB4rxc1ZDxIeIW4Dzd6i7L8AJog",
  authDomain: "fantasy-blog-2194f.firebaseapp.com",
  projectId: "fantasy-blog-2194f",
  storageBucket: "fantasy-blog-2194f.appspot.com",
  messagingSenderId: "809356991298",
  appId: "1:809356991298:web:ea071cb1fb45af0568c6db",
  measurementId: "G-C9YE4BHR7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFireStore(app)