'use client';

import { useQuery } from '@tanstack/react-query';
import {
    API_UserProfile,
    API_ListFollowers,
    API_ListFollowing,
    API_PostProfile
} from '@/src/api/API_userProfile';
import { UserProfile, UserPost, ListFollowers, ListFollowing } from '@/src/interfaces/userProfile';

/**
 * TANSTACK QUERY - Hooks lấy dữ liệu Profile
 * 
 * Các hooks này dùng để lấy thông tin profile, posts, followers, following
 * của một user dựa trên username.
 */

// Query Keys cho profile
export const profileKeys = {
    all: ['profile'] as const,
    detail: (username: string) => [...profileKeys.all, username] as const,
    posts: (username: string) => [...profileKeys.all, username, 'posts'] as const,
    followers: (username: string) => [...profileKeys.all, username, 'followers'] as const,
    following: (username: string) => [...profileKeys.all, username, 'following'] as const,
};

// Lấy thông tin profile cơ bản (bio, avatar, số follower, ...)
export function useUserProfile(username: string) {
    return useQuery<UserProfile>({
        queryKey: profileKeys.detail(username),
        queryFn: () => API_UserProfile(username!),
        enabled: !!username, // Chỉ fetch khi có username
    });
}

// Lấy danh sách bài viết của user
export function useUserPosts(username: string) {
    return useQuery<UserPost[]>({ // kiểu dữ liệu trả về
        queryKey: profileKeys.posts(username), // truy vấn theo key
        queryFn: () => API_PostProfile(username!), // api lấy dữ liệu
        enabled: !!username, // chỉ fetch khi có username
    });
}

// Lấy danh sách người đang follow user này
export function useFollowers(username: string) {
    return useQuery<ListFollowers>({
        queryKey: profileKeys.followers(username),
        queryFn: () => API_ListFollowers(username!),
        enabled: !!username,
    });
}

// Lấy danh sách user này đang follow ai
export function useFollowing(username: string) {
    return useQuery<ListFollowing>({
        queryKey: profileKeys.following(username),
        queryFn: () => API_ListFollowing(username!),
        enabled: !!username,
    });
}

// Hook tổng hợp - lấy tất cả dữ liệu profile cùng lúc
export function useFullProfile(username: string) {
    const profile = useUserProfile(username);
    const posts = useUserPosts(username);
    const followers = useFollowers(username);
    const following = useFollowing(username);

    return {
        profile: profile.data,
        posts: posts.data,
        followers: followers.data?.followers,
        following: following.data?.followings,
        isLoading: profile.isLoading || posts.isLoading || followers.isLoading || following.isLoading,
        isError: profile.isError || posts.isError || followers.isError || following.isError,
    };
}
