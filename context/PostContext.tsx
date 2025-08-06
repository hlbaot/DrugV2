'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { PostType } from '@/interfaces/post';
import { getAllPosts } from '@/api/API_getPost';

export interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  refreshPosts: () => void;
  updatePostLikeStatus: (postId: number, liked: boolean, likeCount: number) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Cập nhật thông tin bài viết, đặc biệt là trạng thái like
  const updatePostLikeStatus = (postId: number, liked: boolean, likeCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likedByCurrentUser: liked, likeCount: likeCount }
          : post
      )
    );
  };

  // Refresh lại danh sách bài viết
  const refreshPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error('Lỗi khi làm mới danh sách post:', err);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, refreshPosts, updatePostLikeStatus }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext phải được dùng trong PostProvider');
  return context;
};
