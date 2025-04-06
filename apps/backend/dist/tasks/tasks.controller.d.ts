import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
}
