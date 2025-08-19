'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { PostType } from '@/interfaces/post';
import { getAllPosts } from '@/api/API_getPost';
import { getAllPostsSaved } from '@/api/API_getPostSaved';

export interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  isLoading: boolean;
  refreshPosts: () => Promise<void>;
  updatePostLikeStatus: (postId: number, liked: boolean, likeCount: number) => void;
  updatePostSaveStatus: (postId: number, saved: boolean) => void;
  updatePostCommentCount: (postId: number, newCount: number) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cập nhật trạng thái like của bài viết
  const updatePostLikeStatus = (postId: number, liked: boolean, likeCount: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likedByCurrentUser: liked, likeCount }
          : post
      )
    );
  };

  // Cập nhật trạng thái save của bài viết
  const updatePostSaveStatus = (postId: number, saved: boolean) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, savedByCurrentUser: saved }
          : post
      )
    );
  };

  // Cập nhật số lượng bình luận của bài viết
  const updatePostCommentCount = (postId: number, newCount: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, commentCount: newCount }
          : post
      )
    );
  };


  // Refresh lại danh sách bài viết
  const refreshPosts = async () => {
    try {
      setIsLoading(true);
      const [feed, saved] = await Promise.all([
        getAllPosts(),
        getAllPostsSaved()
      ]);

      const savedIds = new Set<number>(saved.map(s => s.post_id));
      const updatedPosts = feed.map(p => ({
        ...p,
        savedByCurrentUser: savedIds.has(p.id)
      }));

      setPosts(updatedPosts);
      // Giả lập loading chỉnh time hiện
      await new Promise(resolve => setTimeout(resolve, 1200));

    } catch (err) {
      console.error('Lỗi khi làm mới danh sách post:', err);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, setPosts, isLoading, refreshPosts, updatePostLikeStatus, updatePostSaveStatus, updatePostCommentCount }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext phải được dùng trong PostProvider');
  return context;
};
