export declare enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SUB_MANAGER = "SUB_MANAGER",
    USER = "USER"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
