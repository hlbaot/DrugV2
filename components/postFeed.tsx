'use client';

import Post from '../components/post';
import { PostType } from '../interfaces/post';
import { usePostContext } from '@/context/PostContext';

// Sắp xếp bài post theo thời gian mới nhất
const sortPostsByTime = (posts: PostType[]) => {
  return posts
    .filter((post) => post.createdAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

export default function PostFeed() {
  const { posts } = usePostContext();

  // Sắp xếp trước khi render
  const sortedPosts = sortPostsByTime(posts);

  const postItems = sortedPosts.map((post) => (
    <Post key={post.id} postId={post.id} />
  ));


  return (
    <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl
">
      {posts.length === 0 ? (
        <p className="text-2xl text-gray-400">No Post ...</p>
      ) : (
        postItems
      )}
    </div>


  );
}
