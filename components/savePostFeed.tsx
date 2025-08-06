'use client';
import { useEffect } from 'react';
import { SavedPostType } from '@/interfaces/savedPost';
import { useSavePostContext } from '@/context/SavePostContext';
import PostSaved from './postSaved';

export default function SavePostFeed() {
  const { savedPosts, refreshSavedPosts } = useSavePostContext();

  // Gọi lại dữ liệu mỗi khi vào trang
  useEffect(() => {
    refreshSavedPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4 mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
      {savedPosts.map((item) => (
        <PostSaved key={item.post_id} savedPost={item} />
      ))}
    </div>
  );
}