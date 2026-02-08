'use client';

import { create } from 'zustand';
import { PostType } from '@/src/interfaces/post';
import { getAllPosts } from '@/src/api/API_getPost';
import { getAllPostsSaved } from '@/src/api/API_getPostSaved';

/**
 * ZUSTAND STORE - Quản lý state global cho Posts
 * 
 * Zustand giúp lưu trữ và chia sẻ dữ liệu giữa các component mà không cần truyền props.
 * Store này quản lý danh sách bài viết (feed) và các action cập nhật UI.
 */

interface PostStore {
    posts: PostType[];
    isLoading: boolean;
    setPosts: (posts: PostType[]) => void;
    refreshPosts: () => Promise<void>;
    updatePostLikeStatus: (id: number, isLiked: boolean, likeCount: number) => void;
    updatePostSaveStatus: (id: number, isSaved: boolean) => void;
    updatePostCommentCount: (id: number, newCount: number) => void;
}

export const usePostStore = create<PostStore>()((set) => ({
    // State lưu danh sách posts và trạng thái loading
    posts: [],
    isLoading: true,

    // Gán trực tiếp danh sách posts mới
    setPosts: (posts) => set({ posts }),

    // Gọi API lấy posts + saved posts, sau đó merge lại để biết post nào đã được lưu
    refreshPosts: async () => {
        try {
            set({ isLoading: true });
            const [feed, saved] = await Promise.all([getAllPosts(), getAllPostsSaved()]);
            const savedIds = new Set<number>(saved.map(s => s.id));
            const updatedPosts = feed.map(p => ({ ...p, isSaved: savedIds.has(p.id) }));
            set({ posts: updatedPosts });
        } catch (err) {
            console.error('Lỗi khi refresh posts:', err);
        } finally {
            set({ isLoading: false });
        }
    },

    // Cập nhật like trong UI ngay lập tức (không đợi API trả về)
    updatePostLikeStatus: (id, isLiked, likeCount) => {
        set(state => ({
            posts: state.posts.map(post =>
                post.id === id ? { ...post, isLiked, likeCount } : post
            )
        }));
    },

    // Cập nhật trạng thái đã lưu bài viết trong UI
    updatePostSaveStatus: (id, isSaved) => {
        set(state => ({
            posts: state.posts.map(post =>
                post.id === id ? { ...post, isSaved } : post
            )
        }));
    },

    // Cập nhật số lượng comment của bài viết
    updatePostCommentCount: (id, newCount) => {
        set(state => ({
            posts: state.posts.map(post =>
                post.id === id ? { ...post, commentCount: newCount } : post
            )
        }));
    },
}));

// Alias - giữ tương thích với code cũ dùng tên usePostContext
export const usePostContext = () => usePostStore();
