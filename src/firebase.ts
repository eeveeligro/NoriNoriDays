// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUGzyPdZly4dgeZn_ee5t5hrJ8JuJDopY",
  authDomain: "norinori-45225.firebaseapp.com",
  projectId: "norinori-45225",
  storageBucket: "norinori-45225.appspot.com",
  messagingSenderId: "701868134724",
  appId: "1:701868134724:web:48ecfc59be2c8d2d4fc711",
  measurementId: "G-Y75D2PGWWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;