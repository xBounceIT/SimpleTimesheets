import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(email: string, password: string): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
    login(email: string, password: string, res: Response): Promise<{
        message: string;
    }>;
    me(req: Request): Promise<any>;
}
