'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { SavedPostType } from '@/interfaces/savedPost';
import { getAllPostsSaved } from '@/api/API_getPostSaved';

interface SavePostContextType {
  savedPosts: SavedPostType[];
  setSavedPosts: React.Dispatch<React.SetStateAction<SavedPostType[]>>;
  refreshSavedPosts: () => Promise<void>;
  updateSavedStatus: (postId: number, saved: boolean, newSavedPostData?: SavedPostType) => void;
}

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
    setSavedPosts((prev) => {
      const exists = prev.some((item) => item.post_id === postId);

      if (saved && !exists && newSavedPostData) {
        return [newSavedPostData, ...prev];
      }

      if (!saved && exists) {
        return prev.filter((item) => item.post_id !== postId);
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
