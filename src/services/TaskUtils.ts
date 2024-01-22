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
export async function completeTask(taskId : string, frequency:string) {
    if (!taskId) {
        throw new Error("Task ID is undefined");
    }

    console.log('frequency check:', frequency);
    const today = new Date().toISOString();

    function newDueDate() {
        let date = new Date();
        switch(frequency) {
            case 'Once':
                break;
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
    try {
        await firebaseService.updateTaskByID(taskId, { lastCompletedDate: today, assignedDate: newAssignedDate }); //TODO add error handling
    } catch (error) {
        console.error('unable to updateTaskByID', error);
    }
}
