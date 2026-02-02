'use client';

import { create } from 'zustand';
import { UserProfile, UserPost, FollowItem } from '@/src/interfaces/userProfile';
import {
    API_UserProfile,
    API_ListFollowers,
    API_ListFollowing,
    API_PostProfile,
    API_updateProfile,
    API_Follow,
    API_Unfollow
} from '@/src/api/API_userProfile';
import { useUserStore } from './useUserStore';

/**
 * ZUSTAND STORE - Quản lý dữ liệu Profile
 * 
 * Store này quản lý:
 * - myProfile: Thông tin profile của chính mình
 * - viewedProfile: Thông tin profile đang xem (của người khác)
 * - Danh sách posts, followers, following
 */

interface ProfileStore {
    myProfile: UserProfile | null;
    viewedProfile: UserProfile | null;
    myPosts: UserPost[];
    viewedPosts: UserPost[];
    followers: FollowItem[];
    following: FollowItem[];

    setMyProfile: (profile: UserProfile | null | ((prev: UserProfile | null) => UserProfile | null)) => void;
    setViewedProfile: (profile: UserProfile | null | ((prev: UserProfile | null) => UserProfile | null)) => void;
    setMyPosts: (posts: UserPost[] | ((prev: UserPost[]) => UserPost[])) => void;
    setViewedPosts: (posts: UserPost[] | ((prev: UserPost[]) => UserPost[])) => void;
    setFollowers: (followers: FollowItem[]) => void;
    setFollowing: (following: FollowItem[]) => void;

    refreshViewedProfile: (username: string) => Promise<void>;
    refreshMyProfile: () => Promise<void>;
    updatePostCounts: (id: number, likeCount: number, commentCount: number) => void;
    followUser: (userId: number) => Promise<void>;
    unfollowUser: (userId: number) => Promise<void>;
    updateProfile: (data: any) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    // State lưu trữ dữ liệu profile
    myProfile: null,
    viewedProfile: null,
    myPosts: [],
    viewedPosts: [],
    followers: [],
    following: [],

    // Các setter cho phép cập nhật trực tiếp hoặc dùng callback function
    setMyProfile: (input) => set((state) => ({
        myProfile: typeof input === 'function' ? input(state.myProfile) : input
    })),
    setViewedProfile: (input) => set((state) => ({
        viewedProfile: typeof input === 'function' ? input(state.viewedProfile) : input
    })),
    setMyPosts: (input) => set((state) => ({
        myPosts: typeof input === 'function' ? input(state.myPosts) : input
    })),
    setViewedPosts: (input) => set((state) => ({
        viewedPosts: typeof input === 'function' ? input(state.viewedPosts) : input
    })),
    setFollowers: (followers) => set({ followers }),
    setFollowing: (following) => set({ following }),

    // Lấy thông tin profile người khác (gọi 4 API song song để nhanh hơn)
    refreshViewedProfile: async (username: string) => {
        try {
            const [profileData, postData, followersData, followingData] = await Promise.all([
                API_UserProfile(username),
                API_PostProfile(username),
                API_ListFollowers(username),
                API_ListFollowing(username),
            ]);
            set({
                viewedProfile: profileData,
                viewedPosts: postData || [],
                followers: followersData.followers || [],
                following: followingData.followings || []
            });
        } catch (error) {
            console.error('Lỗi khi lấy profile:', error);
        }
    },

    // Lấy thông tin profile của chính mình
    refreshMyProfile: async () => {
        const user = useUserStore.getState().user;
        if (!user?.username) {
            set({ myProfile: null, myPosts: [], followers: [], following: [] });
            return;
        }
        try {
            const [profileData, postData, followersData, followingData] = await Promise.all([
                API_UserProfile(user.username),
                API_PostProfile(user.username),
                API_ListFollowers(user.username),
                API_ListFollowing(user.username),
            ]);
            set({
                myProfile: profileData,
                myPosts: postData || [],
                followers: followersData.followers || [],
                following: followingData.followings || []
            });
        } catch (error) {
            console.error('Lỗi khi lấy profile:', error);
        }
    },

    // Cập nhật số like/comment của bài viết trong profile
    updatePostCounts: (id, likeCount, commentCount) => {
        set(state => ({
            viewedPosts: state.viewedPosts.map(post =>
                post.id === id ? { ...post, likeCount, commentCount } : post
            )
        }));
    },

    // Follow user và cập nhật UI ngay
    followUser: async (userId) => {
        try {
            await API_Follow(userId);
            set(state => ({
                myProfile: state.myProfile ? { ...state.myProfile, followingCount: state.myProfile.followingCount + 1 } : null,
                viewedProfile: state.viewedProfile ? { ...state.viewedProfile, followerCount: state.viewedProfile.followerCount + 1, isFollowing: true } : null
            }));
        } catch (error) {
            console.error('Follow thất bại:', error);
        }
    },

    // Unfollow user và cập nhật UI ngay
    unfollowUser: async (userId) => {
        try {
            await API_Unfollow(userId);
            set(state => ({
                myProfile: state.myProfile ? { ...state.myProfile, followingCount: state.myProfile.followingCount - 1 } : null,
                viewedProfile: state.viewedProfile ? { ...state.viewedProfile, followerCount: state.viewedProfile.followerCount - 1, isFollowing: false } : null
            }));
        } catch (error) {
            console.error('Unfollow thất bại:', error);
        }
    },

    // Cập nhật thông tin cá nhân (bio, avatar, ...) và sync với UserStore
    updateProfile: async (data) => {
        const updatedProfile: UserProfile = await API_updateProfile(data);
        useUserStore.getState().updateUser({
            username: updatedProfile.username,
            avatarUrl: updatedProfile.avatarUrl,
        });
        set({ myProfile: updatedProfile });
    }
}));

// Alias - giữ tương thích với code cũ
export const useProfile = () => useProfileStore();
