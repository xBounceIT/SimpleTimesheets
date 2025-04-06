export class CreateTaskDto {
  name: string;
  projectId: number;
  description?: string | null;
}
