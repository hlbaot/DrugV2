'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User, UserContextType } from '@/src/interfaces/user';

// Tạo context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Lấy user từ localStorage khi app khởi động (reload trang)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 🔹 Mỗi khi user thay đổi → tự động lưu/clear localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } 
  }, [user]);

  //Hàm cập nhật 1 phần thông tin user (dùng khi update profile)
  const updateUser = (newData: Partial<User>) =>
    setUser((prev) => (prev ? { ...prev, ...newData } : prev));

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tiện dụng để lấy context
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};
