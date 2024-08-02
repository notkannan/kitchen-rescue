import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA1mX-zHxmYYh5J-0DYpiOygHxP36cMzQE",
  authDomain: "kitchen-rescue.firebaseapp.com",
  projectId: "kitchen-rescue",
  storageBucket: "kitchen-rescue.appspot.com",
  messagingSenderId: "502750164647",
  appId: "1:502750164647:web:2d9e4f4cae5ea2c86b8d82",
  measurementId: "G-JKSS7Q742Q"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db: Firestore = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };