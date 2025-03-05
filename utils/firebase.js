import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiJwMwn7a8CbA85Nv0GMET0NmDXL8rmso",
  authDomain: "toy-project2-team4.firebaseapp.com",
  projectId: "toy-project2-team4",
  storageBucket: "toy-project2-team4.firebasestorage.app",
  messagingSenderId: "443901086073",
  appId: "1:443901086073:web:d5e383efcb170fd71947a8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
