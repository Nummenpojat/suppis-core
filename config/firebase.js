// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWcwH_q5vnqSRhtiIZShtNray1aYzRRtI",
  authDomain: "suppis-382f9.firebaseapp.com",
  projectId: "suppis-382f9",
  storageBucket: "suppis-382f9.appspot.com",
  messagingSenderId: "847554464937",
  appId: "1:847554464937:web:2afeb9e429ff128bd12db8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore()