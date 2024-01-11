// src/models/User.ts
export interface User {
        uid: string;
        email: string;
        household?: string;
        displayName?: string;
        completedTasks?: { title: string; date: string }[];
      }