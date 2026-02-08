'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getCommentsPostId } from '@/src/api/API_getPost';
import { getAllPostsSaved } from '@/src/api/API_getPostSaved';
import { PostType, CommentType } from '@/src/interfaces/post';
import { SavedPostType } from '@/src/interfaces/savedPost';

/**
 * TANSTACK QUERY - Hooks lấy dữ liệu Posts
 * 
 * TanStack Query tự động:
 * - Cache dữ liệu để không gọi API lại nếu data còn mới (staleTime)
 * - Hiển thị loading/error states
 * - Tự động refetch khi cần thiết
 */

// Query Keys - định danh duy nhất cho mỗi loại data trong cache
export const postKeys = {
    all: ['posts'] as const,
    feed: () => [...postKeys.all, 'feed'] as const,
    saved: () => [...postKeys.all, 'saved'] as const,
    detail: (id: number) => [...postKeys.all, 'detail', id] as const,
    comments: (id: number) => [...postKeys.all, 'comments', id] as const,
};

// Lấy danh sách bài viết feed + merge trạng thái đã lưu
export function usePostsFeed() {
    return useQuery<PostType[]>({
        queryKey: postKeys.feed(),
        queryFn: async () => {
            // Gọi 2 API song song để lấy feed và saved posts
            const [feed, saved] = await Promise.all([getAllPosts(), getAllPostsSaved()]);
            const savedIds = new Set<number>(saved.map(s => s.id));
            // Thêm trường isSaved vào mỗi post
            return feed.map(p => ({ ...p, isSaved: savedIds.has(p.id) }));
        },
        staleTime: 1000 * 60 * 2, // Feed fresh trong 2 phút
    });
}

// Lấy danh sách bài viết đã lưu (bookmark)
export function useSavedPosts() {
    return useQuery<SavedPostType[]>({
        queryKey: postKeys.saved(),
        queryFn: getAllPostsSaved,
        staleTime: 1000 * 60, // Saved posts fresh trong 1 phút
    });
}

// Lấy comments của một bài viết cụ thể
export function usePostComments(postId: number) {
    return useQuery<CommentType[]>({
        queryKey: postKeys.comments(postId),
        queryFn: () => getCommentsPostId(postId),
        enabled: !!postId, // Chỉ fetch khi có postId
    });
}
