import React, { useState, useEffect } from 'react';
import { FirebaseService } from '../services/FirestoreServices';
import { Typography } from "@mui/material";


interface CompletedTasksProps {
 id: string;
}

const CompletedTasksList: React.FC<CompletedTasksProps> = ({ id }) => {
    console.log('whats our id?', id)
 const [tasks, setTasks] = useState<string[]>([]);
 const firebaseService = new FirebaseService();

 useEffect(() => {
    const fetchCompletedTasks = async () => {
      const completedTasks = await firebaseService.getCompletedTasksForUser(id);
      const tasksToDisplay = completedTasks.map(task => JSON.stringify(task))
      setTasks(tasksToDisplay);
    };

    fetchCompletedTasks();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
    <div>
        <h3>What have you done to help out?</h3>
         <Typography variant="body2">
            Completed Tasks: {tasks.length || 0}
          </Typography>
      {tasks.map((task, index) => (
        <p key={index}>{task}</p>
      ))}
    </div>
 );
};

export default CompletedTasksList;