
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, query, where } from "firebase/firestore";
import app from '../firebase/firebaseconfig';
import { User } from '../models/User';
// import { Task } from '../models/Task';

// Initialize Firestore
const db = getFirestore(app);

// Class delivers CRUD functionality for Firestore Users and Task Collection
export class FirebaseService {
    async readUsers(): Promise<void> {
        const querySnapshot = await getDocs(collection(db, 'users'));

        querySnapshot.forEach((doc) => {
            const user: User = doc.data() as any;
            console.log(`${doc.id} => ${JSON.stringify(user)}`);
        });
       
    }
    async createUser(email: string, uid: string): Promise<void> {
        const userCollectionRef = collection(db, 'users');
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

    async getUserByEmail(email:string): Promise<User | null>{
        const userCollectionRef = collection(db, 'users');

        const userQuery = query(userCollectionRef, where('email', '==', email))
        try {
            // Execute the query
            const querySnapshot = await getDocs(userQuery);
        
            // Check if there are any matching documents
            if (querySnapshot.size > 0) {
              // Retrieve the first document (assuming email is unique)
              const userData = querySnapshot.docs[0].data() as User;
              console.log(userData);
              return userData;
            } else {
              // No matching documents found
              console.log(`No user found with email: ${email}`);
              return null;
            }
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Error fetching user by email');
          }
    }

    // Other functions to interact with Firestore...
}