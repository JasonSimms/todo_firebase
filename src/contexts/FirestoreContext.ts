import { getFirestore } from "firebase/firestore";
import app from '../firebase/firebaseconfig';
import { createContext } from 'react';

// Initialize Firestore

const db = getFirestore(app);
export const FirestoreContext = createContext(db);
