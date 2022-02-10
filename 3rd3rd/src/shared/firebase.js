import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0zTbrjRdz0dS8GUvQvyRfc6WxIavlhWU",
  authDomain: "image-community-6dec8.firebaseapp.com",
  projectId: "image-community-6dec8",
  storageBucket: "image-community-6dec8.appspot.com",
  messagingSenderId: "1032440629457",
  appId: "1:1032440629457:web:40f263baac7ff369afddf0",
  measurementId: "G-NQPT8X7G4P"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime};