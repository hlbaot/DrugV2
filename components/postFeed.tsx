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
    <div className="flex mt-[4rem] sm:mt-[2rem] bg-[10rem] flex-col items-center">
      {posts.length === 0 ? (
        <p className="text-2xl text-gray-400">No Post ...</p>
      ) : (
        postItems
      )}
    </div>

  );
}
