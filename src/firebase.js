// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw81iy0kEnwv-6VjiBRAEzuAmw5d_Df1k",
    authDomain: "majdapp97.firebaseapp.com",
    projectId: "majdapp97",
    storageBucket: "majdapp97.appspot.com",
    messagingSenderId: "254880577908",
    appId: "1:254880577908:web:9607499fe2df213ed85421",
    measurementId: "G-MLM3S9VG3S"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage };
