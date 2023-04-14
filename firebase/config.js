// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMgRBZPGOOrzT71eX8lBXfLGVQJQt9d1E",
  authDomain: "thebucketlist-72e7a.firebaseapp.com",
  projectId: "thebucketlist-72e7a",
  storageBucket: "thebucketlist-72e7a.appspot.com",
  messagingSenderId: "281635667457",
  appId: "1:281635667457:web:0bcb495b6f93c92c618a00",
  storageBucket: '<PROJECT_ID>.appspot.com',

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);

