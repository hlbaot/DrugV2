'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ProfileContextType } from '@/interfaces/userProfile';
import { getUserProfile } from '@/api/API_getUserProfile';
import { useUser } from './UserContext';

// ✅ Tạo Context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  // 🧱 Tách rõ: profile của chính mình và profile đang xem
  const [myProfile, setMyProfile] = useState<UserProfile | null>(null);
  const [viewedProfile, setViewedProfile] = useState<UserProfile | null>(null);

  const { user } = useUser();

  // 🔹 API: Lấy profile của người khác (hoặc ai đó theo username)
  const refreshViewedProfile = async (username: string) => {
    try {
      const data = await getUserProfile(username);
      setViewedProfile(data);
    } catch (error) {
      console.error('Lỗi khi lấy profile người khác:', error);
    }
  };

  // 🔹 API: Lấy profile của chính mình
  const refreshMyProfile = async () => {
    if (!user?.username) return;
    try {
      const data = await getUserProfile(user.username);
      setMyProfile(data);
    } catch (error) {
      console.error('Lỗi khi lấy profile của chính mình:', error);
    }
  };

  // 🔁 Tự động gọi khi user login
  useEffect(() => {
    if (user?.username) {
      refreshMyProfile();
    } else {
      setMyProfile(null);
    }
  }, [user]);

  // 🔧 Cập nhật likeCount và commentCount của bài post trong profile
  const updatePostCounts = (postId: number, likeCount: number, commentCount: number) => {
    // Cập nhật cho myProfile
    setMyProfile(prev => {
      if (prev && prev.posts) {
        const updatedPosts = prev.posts.map(post =>
          post.id === postId ? { ...post, likeCount, commentCount } : post
        );
        return { ...prev, posts: updatedPosts };
      }
      return prev;
    });

    // Cập nhật cho viewedProfile
    setViewedProfile(prev => {
      if (prev && prev.posts) {
        const updatedPosts = prev.posts.map(post =>
          post.id === postId ? { ...post, likeCount, commentCount } : post
        );
        return { ...prev, posts: updatedPosts };
      }
      return prev;
    });
  };

  // ✅ Trả về context value
  return (
    <ProfileContext.Provider
      value={{
        myProfile,
        setMyProfile,
        viewedProfile,
        setViewedProfile,
        refreshMyProfile,
        refreshViewedProfile,
        updatePostCounts,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// ✅ Hook sử dụng context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
