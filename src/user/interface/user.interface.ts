export interface UserInterface {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}
