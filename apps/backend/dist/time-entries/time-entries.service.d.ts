import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
export declare class TimeEntriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateTimeEntryDto): Promise<{
        id: number;
        userId: number;
        clientId: number;
        projectId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        clientId: number;
        projectId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        userId: number;
        clientId: number;
        projectId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateDto: UpdateTimeEntryDto): Promise<{
        id: number;
        userId: number;
        clientId: number;
        projectId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        clientId: number;
        projectId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
