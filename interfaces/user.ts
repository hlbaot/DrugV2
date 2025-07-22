export interface User {
    id: number;
    email: string;
    username: string;
    roles: string[];
    avatarUrl?: string | null;
}