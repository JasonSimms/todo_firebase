/**
 *  Logic and processing of Tasks
 */


// Services
import { FirebaseService } from './FirestoreServices';
// Interfaces
import { Task } from '../models/Task';


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
 *  Mark a task as completed.  
 * @param taskId string 
 */
export async function completeTask(taskId : string) {
    if (!taskId) {
        throw new Error("Task ID is undefined");
    }

    const today = new Date().toISOString();

    const firebaseService = new FirebaseService();
    try {
        await firebaseService.updateTaskByID(taskId, { lastCompletedDate: today }); //TODO add error handling
    } catch (error) {
        console.error('unable to updateTaskByID', error);
    }
}
