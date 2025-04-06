import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
export declare class TimeEntriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateTimeEntryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        projectId: number;
        userId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        projectId: number;
        userId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        projectId: number;
        userId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
    }>;
    update(id: number, updateDto: UpdateTimeEntryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        projectId: number;
        userId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        projectId: number;
        userId: number;
        taskId: number;
        duration: number;
        notes: string | null;
        date: Date;
    }>;
}
