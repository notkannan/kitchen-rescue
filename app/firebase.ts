// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1mX-zHxmYYh5J-0DYpiOygHxP36cMzQE",
  authDomain: "kitchen-rescue.firebaseapp.com",
  projectId: "kitchen-rescue",
  storageBucket: "kitchen-rescue.appspot.com",
  messagingSenderId: "502750164647",
  appId: "1:502750164647:web:2d9e4f4cae5ea2c86b8d82",
  measurementId: "G-JKSS7Q742Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);