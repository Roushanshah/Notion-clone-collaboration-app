import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCflCTYNlgPtCPN9DBACSQV-nEJiGjMi_w",
  authDomain: "notion-clone-dd70d.firebaseapp.com",
  projectId: "notion-clone-dd70d",
  storageBucket: "notion-clone-dd70d.firebasestorage.app",
  messagingSenderId: "900074990680",
  appId: "1:900074990680:web:e0fc5cb27bc39acafe2e2d"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
