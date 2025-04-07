export class CreateTimeEntryDto {
  userId: number;
  clientId: number;
  projectId: number;
  taskId: number;
  duration: number; // in hours
  notes?: string;
  date: Date;
}
