'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stateLike } from '@/src/api/API_likePost';
import { stateSave } from '@/src/api/API_savePost';
import { API_addComment } from '@/src/api/API_Comment';
import { postKeys } from '../queries/usePosts';
import { PostType } from '@/src/interfaces/post';

/**
 * TANSTACK QUERY MUTATIONS - Xử lý các action thay đổi dữ liệu Posts
 * 
 * Mutations dùng cho các thao tác thay đổi data: like, save, comment.
 * Sử dụng "Optimistic Update" để cập nhật UI ngay lập tức trước khi API trả về.
 * Nếu API lỗi sẽ rollback về trạng thái cũ.
 */

// Like/Unlike bài viết
export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: number) => stateLike(postId),

        // Chạy TRƯỚC khi gọi API - cập nhật UI ngay lập tức
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: postKeys.feed() });
            const previousPosts = queryClient.getQueryData<PostType[]>(postKeys.feed());

            // Cập nhật UI ngay (giả định thành công)
            queryClient.setQueryData<PostType[]>(postKeys.feed(), (old) =>
                old?.map(post =>
                    post.id === postId
                        ? { ...post, isLiked: !post.isLiked, likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1 }
                        : post
                )
            );
            return { previousPosts }; // Lưu lại để rollback nếu lỗi
        },

        // Nếu API lỗi - hoàn tác về trạng thái cũ
        onError: (_err, _postId, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(postKeys.feed(), context.previousPosts);
            }
        },

        // Dù thành công hay thất bại - fetch lại data mới từ server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.feed() });
        },
    });
}

// Save/Unsave bài viết (bookmark)
export function useSavePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: number) => stateSave(postId),
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: postKeys.feed() });
            await queryClient.cancelQueries({ queryKey: postKeys.saved() });
            const previousPosts = queryClient.getQueryData<PostType[]>(postKeys.feed());
            const previousSavedPosts = queryClient.getQueryData<any[]>(postKeys.saved());

            queryClient.setQueryData<PostType[]>(postKeys.feed(), (old) =>
                old?.map(post => post.id === postId ? { ...post, isSaved: !post.isSaved } : post)
            );

            // Optimistically update saved posts list
            queryClient.setQueryData<any[]>(postKeys.saved(), (old) => {
                if (!old) return old;

                // Check if post is currently in saved list
                const postExists = old.some(p => p.id === postId);

                if (postExists) {
                    // Remove from saved list (unsaving)
                    return old.filter(p => p.id !== postId);
                } else {
                    // Note: Adding to saved list would require the full post data
                    // In practice, this case is handled by invalidateQueries on success
                    return old;
                }
            });

            return { previousPosts, previousSavedPosts };
        },
        onError: (_err, _postId, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(postKeys.feed(), context.previousPosts);
            }
            if (context?.previousSavedPosts) {
                queryClient.setQueryData(postKeys.saved(), context.previousSavedPosts);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.feed() });
            queryClient.invalidateQueries({ queryKey: postKeys.saved() });
        },
    });
}

// Thêm comment vào bài viết
export function useAddComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, content }: { postId: number; content: string }) =>
            API_addComment(postId, content),

        // Sau khi thành công - cập nhật cache
        onSuccess: (_data, variables) => {
            // Fetch lại danh sách comments
            queryClient.invalidateQueries({ queryKey: postKeys.comments(variables.postId) });
            // Tăng số lượng comment trong feed (không cần fetch lại toàn bộ feed)
            queryClient.setQueryData<PostType[]>(postKeys.feed(), (old) =>
                old?.map(post =>
                    post.id === variables.postId ? { ...post, commentCount: post.commentCount + 1 } : post
                )
            );
        },
    });
}
