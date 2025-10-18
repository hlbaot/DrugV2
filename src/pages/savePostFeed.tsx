'use client';
import { useEffect } from 'react';
import { useSavePostContext } from '@/src/context/SavePostContext';
import PostSaved from '../components/postSaved';

export default function SavePostFeed() {
  const { savedPosts, refreshSavedPosts } = useSavePostContext();

  useEffect(() => {
    refreshSavedPosts();
  }, []);

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
          <PostSaved key={item.post_id} savedPost={item} />
        ))}
      </div>
    </div>
  );

}