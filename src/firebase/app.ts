import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeuQY8Fav3LtkdkqO_C4p36b65mM1Bgss",
  authDomain: "dfgf-b7995.firebaseapp.com",
  projectId: "dfgf-b7995",
  storageBucket: "dfgf-b7995.firebasestorage.app",
  messagingSenderId: "626989162929",
  appId: "1:626989162929:web:6063ec290f3014fe911d90",
  measurementId: "G-13BX99VQCW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, app, auth };
