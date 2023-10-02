import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn0jjVRQsYIZzXB3KEru76bEPbWzDuyPg",
  authDomain: "react-linksredes.firebaseapp.com",
  projectId: "react-linksredes",
  storageBucket: "react-linksredes.appspot.com",
  messagingSenderId: "2207778552",
  appId: "1:2207778552:web:c65cf7d6e029fd9dd7dd0d",
  measurementId: "G-812TS71H7Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics, app };
