// src/models/Task.ts
export interface Task {
    id?: string;
    title: string;
    lastCompletedDate?: string;
    createdBy?: string;
    assignedTo?: string;
    frequency?: string;
    description?: string;
    taskType?: string;
    dateAssigned?: string;
    dateCreated: string;
    // other fields...
   }