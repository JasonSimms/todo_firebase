// src/models/Task.ts
export interface Task {
    uid?: string;
    title: string;
    lastCompletedDate?: boolean;
    createdBy?: string;
    assignedTo?: string;
    frequency?: string;
    description?: string;
    taskType?: string;
    dateAssigned?: string;
    dateCreated: string;
    // other fields...
   }