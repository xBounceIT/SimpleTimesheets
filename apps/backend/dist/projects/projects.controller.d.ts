import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        clientId: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        clientId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        clientId: number;
    }>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        clientId: number;
    }>;
}
