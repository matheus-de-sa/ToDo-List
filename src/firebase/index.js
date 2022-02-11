import { initializeApp } from "firebase/app";
import db from "firebase/firestore";
import auth from "firebase/auth";

const fireabseApp = initializeApp({
    apiKey: "AIzaSyBOspx4C5qzmDUMer0IattYCXpWkaboiRU",
    authDomain: "todo-list-f48a3.firebaseapp.com",
    projectId: "todo-list-f48a3",
    storageBucket: "todo-list-f48a3.appspot.com",
    messagingSenderId: "412522083386",
    appId: "1:412522083386:web:4eacbe7a630703af927103"
});

const FirebaseDB = db;
const FirebaseAuth = auth;

export { fireabseApp, FirebaseAuth, FirebaseDB };
