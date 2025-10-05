export interface User {
    id: number;
    email: string;
    username: string;
    // roles: string[];
    avatarUrl?: string | null;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}