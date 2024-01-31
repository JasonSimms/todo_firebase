// src/models/Task.ts
export interface Task {
    id?: string;
    title: string;
    lastCompletedDate: string | null;
    createdBy?: string;
    assignedTo?: string;
    frequency: 'Once' | 'Weekly' | 'Monthly' | 'Quarterly' | '6mo' | 'Annually';
    description?: string;
    taskType?: string;
    assignedDate: string;
    dateCreated: string;
    // other fields...
   }