'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  API_UserProfile,
  API_ListFollowers,
  API_ListFollowing,
  API_PostProfile,
  API_updateProfile,
} from '@/src/api/API_userProfile';
import { UserProfile, UserPost, ProfileContextType, FollowItem } from '@/src/interfaces/userProfile';
import { useUser } from './UserContext';

// Tạo Context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useUser();

  //state
  const [myProfile, setMyProfile] = useState<UserProfile | null>(null);
  const [viewedProfile, setViewedProfile] = useState<UserProfile | null>(null);
  const [myPosts, setMyPosts] = useState<UserPost[]>([]);
  const [viewedPosts, setViewedPosts] = useState<UserPost[]>([]);
  const [followers, setFollowers] = useState<FollowItem[]>([]);
  const [following, setFollowing] = useState<FollowItem[]>([]);

  // lấy profile người khác
  const refreshViewedProfile = async (username: string) => {
    try {
      const [profileData, postData, followersData, followingData] = await Promise.all([
        API_UserProfile(username),
        API_PostProfile(username),
        API_ListFollowers(username),
        API_ListFollowing(username),
      ]);

      setViewedProfile(profileData);
      setViewedPosts(postData?.posts || []);
      setFollowers(followersData?.followers || []);
      setFollowing(followingData?.followings || []);
    } catch (error) {
      console.error('Lỗi khi lấy profile người khác:', error);
    }
  };

  // lấy profile của chính mình
  const refreshMyProfile = async () => {
    if (!user?.username) return;
    try {
      const [profileData, postData, followersData, followingData] = await Promise.all([
        API_UserProfile(user.username),
        API_PostProfile(user.username),
        API_ListFollowers(user.username),
        API_ListFollowing(user.username),
      ]);

      setMyProfile(profileData);
      setMyPosts(postData.posts || []);
      setFollowers(followersData.followers || []);
      setFollowing(followingData.followings || []);
    } catch (error) {
      console.error('Lỗi khi lấy profile của chính mình:', error);
    }
  };

  // Tự động gọi khi user login
  useEffect(() => {
    if (user?.username) {
      refreshMyProfile();
    } else {
      setMyProfile(null);
      setViewedProfile(null);
      setViewedPosts([]);
      setFollowers([]);
      setFollowing([]);
    }
  }, [user]);

  // Cập nhật likeCount và commentCount của bài post trong profile
  const updatePostCounts = (id: number, likeCount: number, commentCount: number) => {
    setViewedPosts(prev =>
      prev ? prev.map(post =>
        post.id === id ? { ...post, likeCount, commentCount } : post
      ) : prev
    );
  };

  // Cập nhật thông tin profile
  const updateProfile = async (data: any) => {
    const updatedProfile: UserProfile = await API_updateProfile(data);
    // cập nhật vào context user
    updateUser({
      username: updatedProfile.username,
      avatarUrl: updatedProfile.avatarUrl,
    });

    // cập nhật vào profile context
    setMyProfile(updatedProfile);
  };

  // Trả về context value
  return (
    <ProfileContext.Provider
      value={{
        myProfile,
        setMyProfile,
        viewedProfile,
        setViewedProfile,
        myPosts,
        setMyPosts,
        viewedPosts,
        setViewedPosts,
        followers,
        setFollowers,
        following,
        setFollowing,
        refreshMyProfile,
        refreshViewedProfile,
        updatePostCounts,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
