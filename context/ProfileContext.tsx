'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ProfileContextType } from '@/interfaces/userProfile';
import { getUserProfile } from '@/api/API_getUserProfile';
import { useUser } from './UserContext';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useUser();

  const refreshProfile = async (username: string) => {
    try {
      const data = await getUserProfile(username);
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Hàm cập nhật likeCount và commentCount trong profile người dùng
  const updatePostCounts = (postId: number, likeCount: number, commentCount: number) => {
    setUserProfile(prev => {
      if (prev && prev.posts) {
        const updatedPosts = prev.posts.map(post => {
          if (post.id === postId) {
            return { ...post, likeCount, commentCount };
          }
          return post;
        });

        // Trả về state đã thay đổi
        return { ...prev, posts: updatedPosts };
      }
      return prev;  // Nếu không có dữ liệu, trả lại state cũ
    });
  };

  useEffect(() => {
    if (user?.username) {
      refreshProfile(user.username);
    }else{
      setUserProfile(null);
    }
  }, [user]);  

  return (
    <ProfileContext.Provider value={{ userProfile, setUserProfile, refreshProfile, updatePostCounts }}>
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
