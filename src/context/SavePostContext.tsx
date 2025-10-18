'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { SavedPostType, SavePostContextType } from '@/src/interfaces/savedPost';
import { getAllPostsSaved } from '@/src/api/API_getPostSaved';

const SavePostContext = createContext<SavePostContextType | undefined>(undefined);

export const SavePostProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedPosts, setSavedPosts] = useState<SavedPostType[]>([]);

  const refreshSavedPosts = async () => {
    try {
      const posts = await getAllPostsSaved();
      setSavedPosts(posts);
    } catch (err) {
      console.error('Lỗi khi lấy saved posts:', err);
    }
  };

  const updateSavedStatus = (
    postId: number,
    saved: boolean,
    newSavedPostData?: SavedPostType
  ) => {
    setSavedPosts(prev => {
      const exists = prev.some(item => item.post_id === postId);

      if (saved) {
        if (exists) {
          return prev.map(item =>
            item.post_id === postId
              ? { ...item, savedByCurrentUser: true }
              : item
          );
        }
        if (newSavedPostData) {
          return [newSavedPostData, ...prev];
        }
        return prev;
      }

      if (!saved && exists) {
        return prev.filter(item => item.post_id !== postId);
      }

      return prev;
    });
  };



  useEffect(() => {
    refreshSavedPosts();
  }, []);

  return (
    <SavePostContext.Provider
      value={{ savedPosts, setSavedPosts, refreshSavedPosts, updateSavedStatus }}
    >
      {children}
    </SavePostContext.Provider>
  );
};

export const useSavePostContext = () => {
  const context = useContext(SavePostContext);
  if (!context) {
    throw new Error('useSavePostContext phải được dùng bên trong <SavePostProvider>');
  }
  return context;
};
