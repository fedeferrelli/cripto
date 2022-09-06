// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeBfbI1PjEljHzBoxzJbO1LQkfH0omRRA",
  authDomain: "coin-561ab.firebaseapp.com",
  projectId: "coin-561ab",
  storageBucket: "coin-561ab.appspot.com",
  messagingSenderId: "680085780134",
  appId: "1:680085780134:web:a49224b3bed81e9e052667",
  measurementId: "G-P1BK0YS7WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;

