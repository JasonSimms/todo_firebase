
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, query, where, updateDoc, QueryDocumentSnapshot } from "firebase/firestore";
import app from '../firebase/firebaseconfig';
import { User } from '../models/User';
import { Task } from '../models/Task';

// Initialize Firestore
const db = getFirestore(app);

// Class delivers CRUD functionality for Firestore Users and Task Collection
export class FirebaseService {
    /**
     * USER COLLECTION SERVICES
     */
    async readUsers(): Promise<void> {
        const querySnapshot = await getDocs(collection(db, 'users'));

        querySnapshot.forEach((doc) => {
            const user: User = doc.data() as any;
            console.log(`${doc.id} => ${JSON.stringify(user)}`);
        });

    }
    /**
     * Creates a record of User from the Firebase Auth Flow
     * 
     * @param email string
     * @param uid generated from the Firebase Auth Context.
     */
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
    /**
     * Returns 1 user by email assuming that emails are unique!
     * @param email string
     * @returns 
     */
    async getUserByEmail(email: string): Promise<User | null> {
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

    /**
     * Update A user record to manipulate profile.
     * @param email  string
     * @param dataToUpdate object partial of the User Model
     * @returns void
     */
    async updateUserByEmail(email: string, dataToUpdate: Partial<User>): Promise<void> {
        const userToUpdate = await this.getUserByEmail(email);
        if (!userToUpdate) {
            console.error(`User with email ${email} not found.`);
            return;
        }

        const userDocRef = doc(collection(db, 'users'), userToUpdate.uid);

        try {
            // Update the user document with the provided data
            await updateDoc(userDocRef, dataToUpdate);
            console.log(`User with email ${email} updated successfully.`);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }

    /**
     * TASK SERVICES 
     */

    async getAllTasks(): Promise<Task[]> {
        const querySnapshot = await getDocs(collection(db, 'tasks'));

        try {
            const tasksArray: Task[] = [];
            querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
                tasksArray.push(doc.data() as Task)
            });
            return tasksArray;
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Error fetching tasks');
        }
    }
    /**
     * Creates a record of Task
     * 
     * @param task task object from front end conforming to the interface
     * 
     */
    async createTask(task: Task): Promise<void> {
        const taskCollectionRef = collection(db, 'tasks');
        try {
            addDoc(taskCollectionRef, {
               task
            }).then((res) => {
                console.log('new task doc created!',res)

            })
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * Returns 1 task by ID
     * @param email string
     * @returns 
     */
    async getTaskByID(email: string): Promise<User | null> {
        return null;
        // const userCollectionRef = collection(db, 'users');

        // const userQuery = query(userCollectionRef, where('email', '==', email))
        // try {
        //     // Execute the query
        //     const querySnapshot = await getDocs(userQuery);

        //     // Check if there are any matching documents
        //     if (querySnapshot.size > 0) {
        //         // Retrieve the first document (assuming email is unique)
        //         const userData = querySnapshot.docs[0].data() as User;
        //         console.log(userData);
        //         return userData;
        //     } else {
        //         // No matching documents found
        //         console.log(`No user found with email: ${email}`);
        //         return null;
        //     }
        // } catch (error) {
        //     console.error('Error fetching user by email:', error);
        //     throw new Error('Error fetching user by email');
        // }
    }

    /**
     * Update A user record to manipulate profile.
     * @param email  string
     * @param dataToUpdate object partial of the User Model
     * @returns void
     */
    async updateTaskByID(id: string, dataToUpdate: Partial<User>): Promise<void> {
        // const userToUpdate = await this.getUserByEmail(email);
        // if (!userToUpdate) {
        //     console.error(`User with email ${email} not found.`);
        //     return;
        // }

        // const userDocRef = doc(collection(db, 'users'), userToUpdate.uid);

        // try {
        //     // Update the user document with the provided data
        //     await updateDoc(userDocRef, dataToUpdate);
        //     console.log(`User with email ${email} updated successfully.`);
        // } catch (error) {
        //     console.error('Error updating user:', error);
        //     throw new Error('Error updating user');
        // }
    }
}