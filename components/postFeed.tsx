'use client';

import Post from '../components/post';
import { PostType } from '../interfaces/post';
import { usePostContext } from '@/context/PostContext';

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
  const sortedPosts = sortPostsByTime(posts);

  const postItems = sortedPosts.map((post) => {
    console.log('Rendering post:', post.id, post.likeCount, post.likedByCurrentUser);
    return <Post key={post.id} {...post} />;
  });

  return (
    <div className="flex mt-[4rem] flex-col items-center">
      {posts.length === 0 ? <p>Không có bài viết nào</p> : postItems}
    </div>
  );

}
