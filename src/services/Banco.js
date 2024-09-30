import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "api-key",
    authDomain: "auth-domain",
    databaseURL: "database-url",
    projectId: "project-id",
    storageBucket: "bucket",
    messagingSenderId: "messagin-sender-id",
    appId: "app-id",
    measurementId: "measurement-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { db, app, provider, auth, storage };
