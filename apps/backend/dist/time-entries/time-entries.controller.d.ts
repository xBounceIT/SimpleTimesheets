import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
export declare class TimeEntriesController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<{
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
    remove(id: string): Promise<{
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
