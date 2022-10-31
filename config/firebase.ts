// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQlWrPV7vL1gPY3cjLIIt-1UUJaANGrEM",
  authDomain: "food-helper-63fd0.firebaseapp.com",
  projectId: "food-helper-63fd0",
  storageBucket: "food-helper-63fd0.appspot.com",
  messagingSenderId: "833087637499",
  appId: "1:833087637499:web:b588bc7700c47a35266d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore()

// Initialize authentication
export const auth = getAuth(app)

export const signIn = (email: string, password: string) => {
  try {
    const user = createUserWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    console.error(error. message)
  }

}