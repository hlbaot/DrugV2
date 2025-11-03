export interface User {
    id: number;
    email: string;
    username: string;
    avatarUrl: string | null;
} 

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (newData: Partial<User>) => void;
}