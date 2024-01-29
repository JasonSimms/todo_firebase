// src/models/CompletedTask.ts
import { Task } from './Task';

export interface CompletedTask extends Task {
    completedBy: string;
}