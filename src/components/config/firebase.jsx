import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCcoaTi_B597MHY_aohTjhm4tCp2hlY-rA",
  authDomain: "to-do-list-with-auth-191ae.firebaseapp.com",
  projectId: "to-do-list-with-auth-191ae",
  storageBucket: "to-do-list-with-auth-191ae.appspot.com",
  messagingSenderId: "1078877112437",
  appId: "1:1078877112437:web:b597be9546a299934d503c",
  measurementId: "G-VP2Z4Y7SL6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)