'use client';
import Image from 'next/image';
import { useProfile } from '@/context/ProfileContext';

export default function Profile() {
  const { userProfile } = useProfile();

  if (!userProfile) return null;

  return (
    <div className="flex flex-col items-center mx-auto mt-16 sm:mt-12 w-full px-2 max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-start gap-6 sm:gap-12 w-full px-4">
        <Image
          src={userProfile.avatarUrl || '/avatar_default.jpg'}
          alt="Avatar"
          width={200}
          height={200}
          className="aspect-square w-20 sm:w-24 md:w-28 lg:w-32 rounded-full object-cover"
        />

        <section className="flex flex-col gap-4 flex-1 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <p className="text-2xl sm:text-3xl font-semibold">{userProfile.username}</p>
            <button className="rounded-lg border border-gray-300 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-gray-200">
              Edit profile
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8 text-sm sm:text-base">
            <p><span className="font-semibold">{userProfile.postsCount}</span> posts</p>
            <p><span className="font-semibold">{userProfile.followersCount}</span> followers</p>
            <p><span className="font-semibold">{userProfile.followingsCount}</span> following</p>
          </div>
          <p className="text-sm sm:text-base">{userProfile.bio || 'No bio yet'}</p>
        </section>
      </div>

      <hr className="mt-6 w-screen -mx-4 border-t border-gray-200" />

      {/* Grid posts */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 w-full">
        {userProfile.posts.map((post) => {
          const hasImage = post.images.length > 0;
          return (
            <div
              key={post.id}
              className="relative group aspect-square bg-gray-100 overflow-hidden flex items-center justify-center"
            >
              {/* Ảnh hoặc caption */}
              {hasImage ? (
                <Image
                  src={post.images[0]}
                  alt={post.caption || 'Post image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <p className="p-2 text-center text-sm sm:text-base text-gray-800 font-medium z-10">
                  {post.caption}
                </p>
              )}
              {/* over lay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white text-lg font-semibold z-20">
                <div className="flex items-center gap-1">
                  ❤️ {post.likeCount ?? 0}
                </div>
                <div className="flex items-center gap-1">
                  💬 {post.commentCount ?? 0}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
