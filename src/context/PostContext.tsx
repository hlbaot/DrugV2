'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { PostType, PostContextType, CommentType } from '@/src/interfaces/post';
import { getAllPosts } from '@/src/api/API_getPost';
import { getAllPostsSaved } from '@/src/api/API_getPostSaved';

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cập nhật trạng thái like của bài viết
  const updatePostLikeStatus = (id :number, isLiked: boolean, likeCount: number ) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, isLiked, likeCount }
          : post
      )
    );
  };



  // Cập nhật trạng thái save của bài viết
  const updatePostSaveStatus = (id: number, isSaved: boolean) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, isSaved: isSaved }
          : post
      )
    );
  };

  // Cập nhật số lượng bình luận của bài viết
  const updatePostCommentCount = (id: number, newCount: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, commentCount: newCount }
          : post
      )
    );
  };

  // Cập nhật danh sách comment của 1 bài viết
  const updatePostComments = (id: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? {
            ...post,
            commentCount: post.commentCount + 1,
          }
          : post
      )
    );
  };


  // Refresh lại danh sách bài viết
  const refreshPosts = async () => {
    try {
      setIsLoading(true);

      // 🟢 Gọi API lấy danh sách bài viết chính (đã test OK)
      const feed = await getAllPosts();

      // 🔸 Tạm thời chưa có API getAllPostsSaved — comment lại
      const saved = await getAllPostsSaved();
      const savedIds = new Set<number>(saved.map(s => s.id));

      // 🔹 Khi có API saved thì mở lại 2 dòng trên, và giữ code này:
      const updatedPosts = feed.map(p => ({
        ...p,
        isSaved: savedIds.has(p.id)
      }));

      setPosts(updatedPosts);

      await new Promise(resolve => setTimeout(resolve, 1000));

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
      value={{ posts, setPosts, isLoading, refreshPosts, updatePostLikeStatus, updatePostSaveStatus, updatePostCommentCount,  updatePostComments }}
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
