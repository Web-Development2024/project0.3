import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4VNgT9Fasd_67ihlKucrbUoNFbZkDSOc",
  authDomain: "herocare-e3f95.firebaseapp.com",
  projectId: "herocare-e3f95",
  storageBucket: "herocare-e3f95.appspot.com",
  messagingSenderId: "975960241571",
  appId: "1:975960241571:web:6d98d7e2d3ef7df2121616",
  measurementId: "G-0BPPCNK859"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, provider, signInWithPopup, signOut, db, storage };

