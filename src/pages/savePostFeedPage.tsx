'use client';
import { useState } from 'react';
import PostSkeleton from '@/public/skeletonPost';
import { useSavedPosts } from '@/src/hooks/queries/usePosts';
import PostSaved from '../components/postSaved';
import { ModalShowPost } from '../components/modal_detailPost';
import { PostType } from '@/src/interfaces/post';
import { API_detailPost } from '@/src/api/API_detailPost';
import { getCommentsPostId } from '@/src/api/API_getPost';

export default function SavePostFeed() {
  // Sử dụng TanStack Query hook lấy danh sách bài viết đã lưu
  const { data: savedPosts = [], isLoading } = useSavedPosts();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenPost = async (id: number) => {
    try {
      const [postDetail, comments] = await Promise.all([
        API_detailPost(id),
        getCommentsPostId(id),
      ]);
      setSelectedPost({ ...postDetail, comments: comments || [] });
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
        <PostSkeleton mediaHeight={360} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
      <div
        className="
        grid w-full px-2 gap-3
        grid-cols-1 place-items-center mt-16
        sm:grid-cols-2 sm:place-items-stretch sm:mt-16
        md:grid-cols-3 md:mt-16
        lg:grid-cols-4 lg:mt-4
      "
      >
        {savedPosts.map((item) => (
          <div key={item.id} onClick={() => handleOpenPost(item.id)} className="cursor-pointer">
            <PostSaved savedPost={item} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <ModalShowPost
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
}