// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeuQY8Fav3LtkdkqO_C4p36b65mM1Bgss",
  authDomain: "dfgf-b7995.firebaseapp.com",
  projectId: "dfgf-b7995",
  storageBucket: "dfgf-b7995.firebasestorage.app",
  messagingSenderId: "626989162929",
  appId: "1:626989162929:web:6063ec290f3014fe911d90",
  measurementId: "G-13BX99VQCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, app, auth };
