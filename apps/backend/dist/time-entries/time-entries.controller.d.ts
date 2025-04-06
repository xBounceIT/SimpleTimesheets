import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
export declare class TimeEntriesController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<{
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
    remove(id: string): Promise<{
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
