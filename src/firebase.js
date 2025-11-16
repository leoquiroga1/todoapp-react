import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHzaX5ofpOBYLHU28Ke55Db2_NLh1CDLY",
  authDomain: "todoapp-react-project-64516.firebaseapp.com",
  projectId: "todoapp-react-project-64516",
  storageBucket: "todoapp-react-project-64516.appspot.com",
  messagingSenderId: "948126970498",
  appId: "1:948126970498:web:91329105eb8b57f5613a9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
