
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import app from '../firebase/firebaseconfig';
import { User } from '../models/User';


// Initialize Firestore

const db = getFirestore(app);



// import { Task } from '../models/Task';




export class FirebaseService {
    async readUsers(): Promise<void> {
        const userCollectionRef = await collection(db, 'users');
        const querySnapshot = await getDocs(userCollectionRef);

        querySnapshot.forEach((doc) => {
            const user: User = doc.data() as any;
            console.log(`${doc.id} => ${JSON.stringify(user)}`);
        });
       
    }
    async createUser(email: string, uid: string): Promise<void> {
        const userCollectionRef = await collection(db, 'users');
        try {
            addDoc(userCollectionRef, {
                email, uid
            }).then((res) => {
                console.log('new user doc created!')
            })
        } catch (e) {
            console.error(e);
        }
    }

    // Other functions to interact with Firestore...
}