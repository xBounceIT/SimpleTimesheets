export class CreateTimeEntryDto {
  userId: number;
  clientId: number;
  projectId: number;
  taskId: number;
  duration: number; // in minutes or seconds
  notes?: string;
  date: Date;
}
