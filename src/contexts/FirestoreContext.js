import { getFirestore } from "firebase/firestore";
import app from '../firebase/firebaseconfig';
import { createContext } from 'react';


// Initialize Firestore

const db = getFirestore(app);
export const FirestoreContext = createContext(db);

export async function createUser(email, uid) {
    let newUser = { email, uid }
    try {
        db.collection('users').doc().set({
            email, uid
        }).then(res => {
            console.log('new user doc created!')
            console.log(res);
        })
    } catch (e) {
        console.error(e);
    }
    console.log('createUser', uid);
}