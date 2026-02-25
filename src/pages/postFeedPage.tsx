'use client';
import Post from '../components/post';
import { PostType } from '@/src/hooks/post';
import { usePostsFeed } from '@/src/hooks/queries/usePosts';
import PostSkeleton from '@/public/skeletonPost';

const sortPostsByTime = (posts: PostType[]) =>
  posts
    .filter(p => p.createdAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export default function PostFeed() {
  const { data: posts, isLoading } = usePostsFeed();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
        <PostSkeleton mediaHeight={360} />
      </div>
    );
  }

  const sorted = posts ? sortPostsByTime(posts) : [];

  return (
    <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
      {sorted.length === 0 ? (
        <p className="text-2xl text-gray-400">No Post ...</p>
      ) : (
        sorted.map(p => <Post key={p.id} postId={p.id} />)
      )}
    </div>
  );
}
