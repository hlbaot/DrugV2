'use client';
import { useEffect, useState } from 'react';
import { useSavePostContext } from '@/src/context/SavePostContext';
import PostSaved from '../components/postSaved';
import { ModalShowPost } from '../components/modal_detailPost';
import { PostType } from '@/src/interfaces/post';
import { API_detailPost } from '@/src/api/API_detailPost';
import { getCommentsPostId } from '@/src/api/API_getPost';

export default function SavePostFeed() {
  const { savedPosts, refreshSavedPosts } = useSavePostContext();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refreshSavedPosts();
  }, []);

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

  return (
    <div className="pl-[4.5rem] lg:pl-[20%]">
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