// src/models/Task.ts
export interface Task {
    uid?: string;
    title: string;
    lastCompletedDate?: boolean;
    createdBy?: string;
    assignedTo?: string;
    frequency?: string;
    description?: string;
    // other fields...
   }