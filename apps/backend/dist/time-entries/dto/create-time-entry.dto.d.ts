export declare class CreateTimeEntryDto {
    userId: number;
    clientId: number;
    projectId: number;
    taskId: number;
    duration: number;
    notes?: string;
    date: Date;
}
