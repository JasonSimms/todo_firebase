import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  QueryDocumentSnapshot,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import app from "../firebase/firebaseconfig";
import { User } from "../models/User";
import { Task } from "../models/Task";
import { Unsubscribe } from "firebase/auth";
import { CompletedTask } from "../models/CompletedTask";

// Initialize Firestore
const db = getFirestore(app);

// Class delivers CRUD functionality for Firestore Users and Task Collection
export class FirebaseService {
  /**
   * USER COLLECTION SERVICES
   */
  async readUsers(): Promise<void> {
    const querySnapshot = await getDocs(collection(db, "users"));

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
  async createUser(
    email: string,
    uid: string,
    displayName: string,
    photoUrl?: string
  ): Promise<void> {
    const userCollectionRef = collection(db, "users");
    if (!displayName) displayName = email;
    try {
      addDoc(userCollectionRef, {
        email,
        uid,
        displayName,
      }).then((res) => {
        console.log("new user doc created!");
      });
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
    const userCollectionRef = collection(db, "users");

    const userQuery = query(userCollectionRef, where("email", "==", email));
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
      console.error("Error fetching user by email:", error);
      throw new Error("Error fetching user by email");
    }
  }

  async getUserById(uid: string): Promise<User | null> {
    const userCollectionRef = collection(db, "users");

    const userQuery = query(userCollectionRef, where("uid", "==", uid));
    try {
      // Execute the query
      const querySnapshot = await getDocs(userQuery);

      // Check if there are any matching documents
      if (querySnapshot.size > 0) {
        // Retrieve the first document
        const userData = querySnapshot.docs[0].data() as User;
        console.log(userData);
        return userData;
      } else {
        // No matching documents found
        console.log(`No user found with uid: ${uid}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by id:", error);
      throw new Error("Error fetching user by id");
    }
  }

  /**
   * Update A user record to manipulate profile.
   * @param email  string
   * @param dataToUpdate object partial of the User Model
   * @returns void
   */
  async updateUserByEmail(
    email: string,
    dataToUpdate: Partial<User>
  ): Promise<void> {
    const userToUpdate = await this.getUserByEmail(email);
    if (!userToUpdate) {
      console.error(`User with email ${email} not found.`);
      return;
    }

    const userDocRef = doc(collection(db, "users"), userToUpdate.uid);

    try {
      // Update the user document with the provided data
      await updateDoc(userDocRef, dataToUpdate);
      console.log(`User with email ${email} updated successfully.`);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user");
    }
  }

  /**
   * TASK SERVICES
   */

  async getInitialTasks(): Promise<Task[]> {
    const querySnapshot = collection(db, "tasks");
    const tasksArray: Task[] = [];
    const snapshot = await getDocs(querySnapshot);
    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const record = doc.data() as Task;
      record["id"] = doc.id; //include the id for handling
      tasksArray.push(record);
    });
    return tasksArray;
  }

  /**
   * Sets up a real-time listener on the Firestore 'tasks' collection.
   * Every time the collection changes, it retrieves the updated tasks,
   * updates the state with the new tasks, and logs the IDs of the updated tasks.
   *
   * @param setTasksData - A function to update the state with the new tasks.
   * @returns An Unsubscribe function that can be called to stop listening for changes.
   */
  getRealTimeTasks(
    setTasksData: React.Dispatch<React.SetStateAction<Task[]>>
  ): Unsubscribe {
    const collectionRef = collection(db, "tasks");
    return onSnapshot(collectionRef, (snapshot) => {
      console.log("getRealTimeTasksFired...");
      const tasksArray: Task[] = [];
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const record = doc.data() as Task;
        record["id"] = doc.id; //include the id for handling
        // console.log('doc with id ...', record['id']);
        tasksArray.push(record);
      });
      const sortedTasks = tasksArray.sort((a, b) => {
        if (a.assignedDate === "completed") return 1;
        if (b.assignedDate === "completed") return -1;

        const dateA = new Date(a.assignedDate);
        const dateB = new Date(b.assignedDate);
        return dateA.getTime() - dateB.getTime();
      });
      console.log("sorted....", sortedTasks[0].assignedDate);
      setTasksData(sortedTasks);
    });
  }
  /**
   * Creates a record of Task
   *
   * @param task task object from front end conforming to the interface
   *
   */
  async createTask(task: Task): Promise<void> {
    const taskCollectionRef = collection(db, "tasks");
    try {
      addDoc(taskCollectionRef, task).then((res) => {
        console.log("new task doc created!", res);
      });
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Returns 1 task by ID
   * @param taskId string
   * @returns
   */
  async getTaskByID(taskId: string): Promise<Task | null> {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      const docSnapshot = await getDoc(taskDocRef);
      if (docSnapshot.exists()) {
        const taskData = docSnapshot.data() as Task;
        taskData.id = docSnapshot.id; // Attach the id to the task data
        return taskData;
      } else {
        console.log(`No task found with id: ${taskId}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching task by id:", error);
      throw new Error("Error fetching task by id");
    }
  }

  /**
   * Update A user record to manipulate profile.
   * @param id  string
   * @param dataToUpdate object partial of the User Model
   * @returns void
   */
  async updateTaskByID(id: string, dataToUpdate: Partial<Task>): Promise<void> {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, dataToUpdate);
      // console.log(`Task with id ${id} updated successfully.`);
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  }

  //-----------------
  /**
   * Creates a record of Task
   *
   * @param task task object from front end conforming to the interface
   *
   */
  async createCompleteTask(task: CompletedTask): Promise<void> {
    const taskCollectionRef = collection(db, "completedTasks");
    try {
      addDoc(taskCollectionRef, task).then((res) => {
        console.log("new task doc created!", res);
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * @returns an array of completed Tasks
   */
  async getAllCompletedTasks(): Promise<CompletedTask[]> {
    const completedTasksCollectionRef = collection(db, "completedTasks");
    const completedTasksArray: CompletedTask[] = [];
    const snapshot = await getDocs(completedTasksCollectionRef);
    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const record = doc.data() as CompletedTask;
      record["id"] = doc.id; //include the id for handling
      completedTasksArray.push(record);
    });
    return completedTasksArray;
  }

  /**
   *
   * @param taskId string
   */
  async deleteCompletedTask(taskId: string): Promise<void> {
    const taskDocRef = doc(db, "completedTasks", taskId);
    try {
      await deleteDoc(taskDocRef);
      console.log(`Task with id ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Error deleting task");
    }
  }

  /**
   * Retrieves all completed tasks completed by a specific user ID.
   *
   * @param completedBy string representing the user ID who completed the tasks.
   * @returns an array of CompletedTask objects.
   */
  async getCompletedTasksForUser(
    completedBy: string
  ): Promise<CompletedTask[]> {
    const completedTasksCollectionRef = collection(db, "completedTasks");
    const completedTasksQuery = query(
      completedTasksCollectionRef,
      where("completedBy", "==", completedBy)
    );
    const completedTasksArray: CompletedTask[] = [];

    try {
      const snapshot = await getDocs(completedTasksQuery);
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const record = doc.data() as CompletedTask;
        record["id"] = doc.id; // Include the id for handling
        completedTasksArray.push(record);
      });
      return completedTasksArray;
    } catch (error) {
      console.error("Error fetching completed tasks for user:", error);
      throw new Error("Error fetching completed tasks for user");
    }
  }
}
