import { PrismaService } from '../prisma/prisma.service';
import { Role } from './roles.decorator';
export declare class AdminController {
    private prisma;
    constructor(prisma: PrismaService);
    listUsers(): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUserRole(id: string, role: Role): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserDetails(id: string, data: {
        firstName?: string;
        lastName?: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
