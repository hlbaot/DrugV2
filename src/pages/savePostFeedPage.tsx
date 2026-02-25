'use client';
import { useState } from 'react';
import PostSkeleton from '@/public/skeletonPost';
import { useSavedPosts } from '@/src/hooks/queries/usePosts';
import PostSaved from '../components/postSaved';
import { ModalShowPost } from '../components/modal_detailPost';
import { PostType } from '@/src/hooks/post';
import { API_detailPost } from '@/src/api/API_detailPost';
import { getCommentsPostId } from '@/src/api/API_getPost';

export default function SavePostFeed() {
  // Sử dụng TanStack Query hook lấy danh sách bài viết đã lưu
  const { data: savedPosts = [], isLoading } = useSavedPosts();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Helper function to check if post has images
  const hasImages = (post: any) => {
    if (!post.images) return false;
    if (typeof post.images === 'string') return post.images.length > 0;
    return Array.isArray(post.images) && post.images.length > 0;
  };

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
      <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-7xl">
        <PostSkeleton mediaHeight={360} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-4 max-w-7xl">
      {/* Instagram-style Masonry Grid */}
      <div
        className="
          grid w-full gap-1
          grid-cols-2 auto-rows-[200px]
          sm:grid-cols-3 sm:auto-rows-[220px]
          md:grid-cols-4 md:auto-rows-[240px]
          lg:grid-cols-5 lg:auto-rows-[260px]
        "
        style={{ gridAutoFlow: 'dense' }}
      >
        {savedPosts.map((item) => {
          const postHasImages = hasImages(item);
          return (
            <div
              key={item.id}
              className={`
                ${postHasImages
                  ? 'col-span-2 row-span-2'
                  : 'col-span-1 row-span-1'
                }
              `}
            >
              <PostSaved
                savedPost={item}
                onOpenDetail={() => handleOpenPost(item.id)}
                hasImage={postHasImages}
              />
            </div>
          );
        })}
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