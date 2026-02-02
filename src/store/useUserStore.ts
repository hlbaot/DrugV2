'use client';

import { create } from 'zustand';
import { User } from '@/src/interfaces/user';

/**
 * ZUSTAND STORE - Quản lý thông tin User đang đăng nhập
 * 
 * Store này lưu trữ thông tin người dùng hiện tại và đồng bộ với localStorage
 * để giữ trạng thái đăng nhập khi refresh trang.
 */

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (newData: Partial<User>) => void;
    initializeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    // Thông tin user đang đăng nhập (null nếu chưa đăng nhập)
    user: null,

    // Đăng nhập/Đăng xuất: set user và lưu vào localStorage
    setUser: (user) => {
        set({ user });
        user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
    },

    // Cập nhật một phần thông tin user (ví dụ: đổi avatar, username)
    updateUser: (newData) => {
        set((state) => {
            const updatedUser = state.user ? { ...state.user, ...newData } : null;
            if (updatedUser) localStorage.setItem('user', JSON.stringify(updatedUser));
            return { user: updatedUser };
        });
    },

    // Khi app khởi động: đọc user từ localStorage để khôi phục session
    initializeUser: () => {
        if (typeof window === 'undefined') return; // Bỏ qua khi chạy trên server
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                set({ user: JSON.parse(storedUser) });
            } catch {
                localStorage.removeItem('user');
            }
        }
    }
}));

// Alias - giữ tương thích với code cũ
export const useUser = () => useUserStore();
