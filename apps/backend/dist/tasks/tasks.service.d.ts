import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        projectId: number;
        description: string | null;
    }>;
}
