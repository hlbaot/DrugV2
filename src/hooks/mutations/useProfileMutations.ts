'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_Follow, API_Unfollow, API_updateProfile } from '@/src/api/API_userProfile';
import { profileKeys } from '../queries/useProfile';
import { UserProfile } from '@/src/interfaces/userProfile';
import { useUserStore } from '@/src/store/useUserStore';

/**
 * TANSTACK QUERY MUTATIONS - Xử lý các action thay đổi dữ liệu Profile
 * 
 * Mutations cho follow, unfollow, update profile.
 * Sử dụng Optimistic Update để UX mượt mà hơn.
 */

// Follow một user
export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, username }: { userId: number; username: string }) =>
            API_Follow(userId),

        // Cập nhật UI ngay trước khi API trả về
        onMutate: async ({ username }) => {
            await queryClient.cancelQueries({ queryKey: profileKeys.detail(username) });
            const previousProfile = queryClient.getQueryData<UserProfile>(profileKeys.detail(username));

            // Giả định follow thành công - tăng follower count
            queryClient.setQueryData<UserProfile>(profileKeys.detail(username), (old) =>
                old ? { ...old, isFollowing: true, followerCount: old.followerCount + 1 } : old
            );
            return { previousProfile, username };
        },

        // Rollback nếu API lỗi
        onError: (_err, _vars, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(profileKeys.detail(context.username), context.previousProfile);
            }
        },

        // Fetch lại data mới từ server
        onSettled: (_data, _err, { username }) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(username) });
            queryClient.invalidateQueries({ queryKey: profileKeys.followers(username) });
        },
    });
}

// Unfollow một user
export function useUnfollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, username }: { userId: number; username: string }) =>
            API_Unfollow(userId),
        onMutate: async ({ username }) => {
            await queryClient.cancelQueries({ queryKey: profileKeys.detail(username) });
            const previousProfile = queryClient.getQueryData<UserProfile>(profileKeys.detail(username));

            // Giả định unfollow thành công - giảm follower count
            queryClient.setQueryData<UserProfile>(profileKeys.detail(username), (old) =>
                old ? { ...old, isFollowing: false, followerCount: old.followerCount - 1 } : old
            );
            return { previousProfile, username };
        },
        onError: (_err, _vars, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(profileKeys.detail(context.username), context.previousProfile);
            }
        },
        onSettled: (_data, _err, { username }) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(username) });
            queryClient.invalidateQueries({ queryKey: profileKeys.followers(username) });
        },
    });
}

// Cập nhật thông tin profile (bio, avatar, ...)
export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { updateUser } = useUserStore();

    return useMutation({
        mutationFn: (data: any) => API_updateProfile(data),

        // Sau khi thành công - cập nhật cả Zustand store và TanStack Query cache
        onSuccess: (updatedProfile: UserProfile) => {
            // Cập nhật user info trong Zustand store (để header, navbar, ... cập nhật)
            updateUser({ username: updatedProfile.username, avatarUrl: updatedProfile.avatarUrl });
            // Cập nhật cache profile
            queryClient.setQueryData(profileKeys.detail(updatedProfile.username), updatedProfile);
        },
    });
}
