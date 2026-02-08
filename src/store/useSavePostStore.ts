'use client';

import { create } from 'zustand';
import { SavedPostType } from '@/src/interfaces/savedPost';
import { getAllPostsSaved } from '@/src/api/API_getPostSaved';

/**
 * ZUSTAND STORE - Quản lý danh sách bài viết đã lưu
 * 
 * Store này lưu trữ các bài viết mà user đã bookmark/save
 * để hiển thị trong trang "Saved Posts".
 */

interface SavePostStore {
    savedPosts: SavedPostType[];
    refreshSavedPosts: () => Promise<void>;
    updateSavedStatus: (id: number, isSaved: boolean, newData?: SavedPostType) => void;
}

export const useSavePostStore = create<SavePostStore>()((set) => ({
    // Danh sách các bài viết đã lưu
    savedPosts: [],

    // Gọi API lấy lại danh sách saved posts
    refreshSavedPosts: async () => {
        try {
            const posts = await getAllPostsSaved();
            set({ savedPosts: posts });
        } catch (err) {
            console.error('Lỗi khi lấy saved posts:', err);
        }
    },

    // Thêm hoặc xóa bài viết khỏi danh sách saved (cập nhật UI ngay)
    updateSavedStatus: (id, isSaved, newData) => {
        set(state => {
            const exists = state.savedPosts.some(item => item.id === id);

            // Lưu bài viết mới
            if (isSaved && !exists && newData) {
                return { savedPosts: [newData, ...state.savedPosts] };
            }
            // Bỏ lưu bài viết
            if (!isSaved && exists) {
                return { savedPosts: state.savedPosts.filter(item => item.id !== id) };
            }
            return state;
        });
    }
}));

// Alias - giữ tương thích với code cũ
export const useSavePostContext = () => useSavePostStore();
