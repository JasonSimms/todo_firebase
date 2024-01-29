/**
 *  Logic and processing of Tasks
 */


// Services
import { FirebaseService } from './FirestoreServices';
// Interfaces
import { Task } from '../models/Task';
import { CompletedTask } from '../models/CompletedTask';


/*
    assignedTo: "house"
​
dateAssigned: "2024-01-24T20:49:49.000Z"
​
description: "Mirror Wiping, Sink, shower, floor"
​
frequency: "weekly"
​
id: "oOFvSziwFdXOOlUPq1eT"
​
taskType: "cleaning"
​
title: "Clean the bathroom"
    lastCompletedDate?: boolean;

    */
/**
 * Creates a completed Task record in a separate Collection.
 * @param taskId string
 * @param user string userId
 */
async function createCompletedTask(taskId: string, userID?: string) {
    if (!userID) throw ('No user ID provided!');

    const firebaseService = new FirebaseService();


    // Get the updated document from the original collection
    const doc = await firebaseService.getTaskByID(taskId);

    if (doc) {
        // console.log('lets complete a completed Task Record', userID);
        // Copy the updated document to the new collection
        let completedTask: CompletedTask = doc as CompletedTask;
        completedTask.completedBy = userID;
        await firebaseService.createCompleteTask(completedTask);
    } else {
        console.log('No such document!');
    }

}
/**
 *  Mark a task as completed.  
 * @param taskId string 
 */
export async function completeTask(taskId: string, frequency: string, user?: string) {
    if (!taskId) {
        throw new Error("Task ID is undefined");
    }

    const today = new Date().toISOString();

    //Return a date in the future based on desired frequency of task.
    function newDueDate() {
        let date = new Date();
        switch (frequency) {
            case 'Once':
                return 'completed'
            case 'Weekly':
                date.setDate(date.getDate() + 7);
                break;
            case 'Monthly':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'Quarterly':
                date.setMonth(date.getMonth() + 3);
                break;
            case '6mo':
                date.setMonth(date.getMonth() + 6);
                break;
            case 'Annually':
                date.setFullYear(date.getFullYear() + 1);
                break;
            default:
                throw new Error(`Invalid newDueDate`);
        }
        return date.toISOString();
    }

    const newAssignedDate = newDueDate();

    const firebaseService = new FirebaseService();
    if (newAssignedDate !== null) {
        await firebaseService.updateTaskByID(taskId, { lastCompletedDate: today, assignedDate: newAssignedDate });
    } else {
        await firebaseService.updateTaskByID(taskId, { lastCompletedDate: today });
    }

    // Create a completedTask Record in a separate collection.
    await createCompletedTask(taskId, user);

}
