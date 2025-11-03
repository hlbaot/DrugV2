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
    id: number,
    isSaved: boolean,
    newSavedPostData?: SavedPostType
  ) => {
    setSavedPosts(prev => {
      const exists = prev.some(item => item.id === id);

      if (isSaved) {
        if (exists) {
          return prev.map(item =>
            item.id === id
              ? { ...item, isSaved: true }
              : item
          );
        }
        if (newSavedPostData) {
          return [newSavedPostData, ...prev];
        }
        return prev;
      }

      if (!isSaved && exists) {
        return prev.filter(item => item.id !== id);
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
