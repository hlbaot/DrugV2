'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/src/interfaces/user';

/**
 * ZUSTAND STORE - Quản lý thông tin User đang đăng nhập
 * 
 * Store này lưu trữ thông tin người dùng hiện tại và sử dụng persist middleware
 * để tự động đồng bộ với localStorage, giữ trạng thái đăng nhập khi refresh trang.
 * 
 * Áp dụng best practices:
 * - Double parentheses create<T>()() cho TypeScript
 * - Persist middleware thay vì sync localStorage thủ công
 * - _hasHydrated pattern cho Next.js SSR hydration
 */

interface UserStore {
    user: User | null;
    _hasHydrated: boolean;
    setUser: (user: User | null) => void;
    updateUser: (newData: Partial<User>) => void;
    setHasHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            // Thông tin user đang đăng nhập (null nếu chưa đăng nhập)
            user: null,

            // Flag để biết store đã hydrate từ localStorage chưa (cho Next.js SSR)
            _hasHydrated: false,

            // Đăng nhập/Đăng xuất: set user (persist middleware tự động lưu localStorage)
            setUser: (user) => set({ user }),

            // Cập nhật một phần thông tin user (ví dụ: đổi avatar, username)
            updateUser: (newData) => set((state) => ({
                user: state.user ? { ...state.user, ...newData } : null
            })),

            // Đánh dấu store đã hydrate xong
            setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
        }),
        {
            name: 'user-storage', // Key lưu trong localStorage
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                // Callback khi rehydrate hoàn tất
                state?.setHasHydrated(true);
            },
        }
    )
);

// Alias - giữ tương thích với code cũ
export const useUser = () => useUserStore();
