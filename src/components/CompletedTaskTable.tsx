import React, { useState, useEffect } from 'react';
import { FirebaseService } from '../services/FirestoreServices';
import { CompletedTask } from '../models/CompletedTask';

const CompletedTaskTable: React.FC = () => {
    const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);


    //get data for the table
    useEffect(() => {
        const firebaseService = new FirebaseService();
        const fetchTasks = async () => {
            const tasksData = await firebaseService.getAllCompletedTasks(); // Get initial tasks
            if (tasksData) {
                const sortedTasks = tasksData.sort((a, b) => {
                    if (a.lastCompletedDate === 'completed') return 1;
                    if (b.lastCompletedDate === 'completed') return -1;

                    if (a.lastCompletedDate !== null && b.lastCompletedDate !== null) {
                        const dateA = new Date(a.lastCompletedDate);

                        const dateB = new Date(b.lastCompletedDate);

                        return dateA.getTime() - dateB.getTime();
                    } else return 1
                });
                setCompletedTasks(sortedTasks);
            } else console.error('No data from fetchTasks!')
        };
        fetchTasks();

        // const unsubscribe = firebaseService.getRealTimeTasks(setCompletedTasks); // Set up real-time listener
        // return () => unsubscribe(); // Clean up on unmount
    }, []);

    return (
        <div>
            <h3>Completed Tasks</h3>
            <p>{completedTasks ? JSON.stringify(completedTasks) : "Loading...."}</p>
        </div>
    );
}

export default CompletedTaskTable;