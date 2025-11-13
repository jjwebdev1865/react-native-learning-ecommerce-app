import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "rnl-ecommerce-app.firebaseapp.com",
  projectId: "rnl-ecommerce-app",
  storageBucket: "rnl-ecommerce-app.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const useFirebase = false;
if (useFirebase) {
  initializeAuth(app, {
    // TODO: section 12 addition. need to find new solution
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
