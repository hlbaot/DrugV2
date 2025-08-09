'use client';
import { useEffect } from 'react';
import { useSavePostContext } from '@/context/SavePostContext';
import PostSaved from './postSaved';

export default function SavePostFeed() {
  const { savedPosts, refreshSavedPosts } = useSavePostContext();

  // Gọi lại dữ liệu mỗi khi vào trang
  useEffect(() => {
    refreshSavedPosts();
  }, []);

  return (
<div
  className="grid w-full px-2 mx-auto gap-3
             grid-cols-1 place-items-center mt-16
             sm:grid-cols-2 sm:place-items-stretch sm:mt-16
             md:grid-cols-3 md:mt-16
             lg:grid-cols-4 lg:ml-64 lg:mt-4
             xl:ml-72"
>

      {savedPosts.map((item) => (
        <PostSaved key={item.post_id} savedPost={item} />
      ))}
    </div>
  );
}